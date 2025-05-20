type TypeWithId = { id: string };
export abstract class Service<T> {
  serviceName: string;
  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  abstract _getRef(...ids: string[]): any;
  abstract _toModel(obj: any): T | null;
  abstract _toObject(model: T): any;
  abstract _orderBy(a: T, b: T): number;
  abstract _getCollectionGroup(): any;
  abstract create(...args: any): Promise<any>;
  abstract update(...args: any): Promise<any>;
  abstract delete(...args: any): Promise<any>;
  abstract findUnique(...args: any): Promise<any>;
  abstract findMany(...args: any): Promise<any>;

  getByFilterAsync = async (filter: any, ...ids: string[]) => {
    let ref = this._getRef(...ids);

    if (filter) {
      filter.forEach((queryObject: any) => {
        ref = ref.where(queryObject[0], queryObject[1], queryObject[2]);
      });
    }

    const result = await this._getCollectionAsync(ref);
    return result;
  };

  _getDocAsync = async (docId: string, ...ids: string[]): Promise<T | null> => {
    const doc = await this._getRef(...ids)
      .doc(docId)
      .get();

    return doc.exists ? this._toModel(doc.data()) : null;
  };

  _deleteDocAsync = async (docId: string, ...ids: string[]): Promise<void> => {
    return await this._getRef(...ids)
      .doc(docId)
      .delete();
  };

  _getCollectionAsync = async (ref: any): Promise<T[]> => {
    const result: T[] = [];

    const docsSnapshots = await ref.get();
    if (docsSnapshots.empty) return result;

    for (let i = 0; i < docsSnapshots.size; i++) {
      const obj = docsSnapshots.docs[i].data();
      const model = this._toModel(obj);

      if (model) {
        result.push(model);
      }
    }

    return result.sort(this._orderBy);
  };

  _getPageByFilterAsync = async (
    filter: any = null,
    orderBy: string = 'createdDate',
    direction: string = 'desc',
    pageSize: number | null = 50,
    lastSnapshot: string = '',
    ...ids: string[]
  ): Promise<{ docs: T[]; size: number; newSnapshot?: object }> => {
    let ref = this._getRef(...ids).orderBy(orderBy, direction);

    if (filter) {
      filter.forEach((queryObject: any) => {
        ref = ref.where(queryObject[0], queryObject[1], queryObject[2]);
      });
    }

    if (lastSnapshot) {
      ref = ref.startAfter(lastSnapshot);
    }
    ref = ref.limit(pageSize);

    const { size, docs, empty } = await ref.get();

    let docsModel: T[] = [];
    const newSnapshot = docs[size - 1];

    if (empty) {
      return { docs: docsModel, size };
    }

    docsModel = docs.map((doc: any) => {
      const model = this._toModel(doc.data());
      return model;
    });

    return { docs: docsModel, size, newSnapshot };
  };

  static compareByDate = (a: any, b: any) => {
    if (!a && !b) return 0;
    if (
      !a.createdDate ||
      !b.createdDate ||
      !a.createdDate.getTime ||
      !b.createdDate.getTime
    )
      return 0;
    if (a.createdDate.getTime() > b.createdDate.getTime()) return 1;
    if (a.createdDate.getTime() < b.createdDate.getTime()) return -1;

    return 0;
  };

  static compareByOrder = (a: any, b: any) => {
    return a?.order - b?.order || 0;
  };

  _updateAllAsync = async (
    collectionRef: any,
    items: (T & TypeWithId)[],
    db: any,
  ) => {
    return await db.runTransaction(async (transaction: any) => {
      const querySnapshot = await collectionRef.get();
      if (!querySnapshot.empty) {
        querySnapshot.docs.forEach((doc: any) => {
          transaction.delete(doc.ref);
        });
      }
      const docRefs = items.map((item) => collectionRef.doc(item.id));
      items.forEach((item, index) => {
        transaction.set(docRefs[index], this._toObject(item));
      });
      return items;
    });
  };

  _deleteCollection = async (collectionRef: any, db: any) => {
    const querySnapshot = await collectionRef.get();
    if (querySnapshot.empty) return;
    try {
      await db.runTransaction(async (transaction: any) => {
        querySnapshot.docs.forEach((doc: any) => {
          transaction.delete(doc.ref);
        });
      });
    } catch (error) {
      const e = error as Error;
      throw new Error(`Error while deleting collection: ${e.message}`);
    }
  };
}
