type TypeWithId = { id: string };

export abstract class RealtimeService<T> {
  serviceName: string;
  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  // Abstract methods that concrete delegates must implement
  abstract _getRef(...ids: string[]): any;
  abstract _toModel(obj: any): T | null;
  abstract _toObject(model: T): any;
  abstract _orderBy(a: T, b: T): number;
  abstract create(...args: any): Promise<any>;
  abstract update(...args: any): Promise<any>;
  abstract delete(...args: any): Promise<any>;
  abstract findUnique(...args: any): Promise<any>;
  abstract findMany(...args: any): Promise<any>;

  // Retrieves items by a client-side filter. Realtime Database queries are more limited than Firestore.
  getByFilterAsync = async (filter: any, ...ids: string[]): Promise<T[]> => {
    const ref = this._getRef(...ids);
    const snapshot = await ref.once('value');
    const data = snapshot.val();
    if (!data) return [];
    let items = Object.values(data);
    if (filter) {
      // Each filter is assumed to be an array: [field, operator, value].
      // For simplicity, only equality is handled here.
      filter.forEach((queryObject: any) => {
        const [field, operator, value] = queryObject;
        if (operator === '==' || operator === '=') {
          items = items.filter((item: any) => item[field] === value);
        }
      });
    }
    return items
      .map((item: any) => this._toModel(item))
      .filter((x) => x != null)
      .sort(this._orderBy);
  };

  // Retrieve a single item by its id
  _getDocAsync = async (docId: string, ...ids: string[]): Promise<T | null> => {
    const ref = this._getRef(...ids).child(docId);
    const snapshot = await ref.once('value');
    const data = snapshot.val();
    return data ? this._toModel(data) : null;
  };

  // Delete a single item by its id
  _deleteDocAsync = async (docId: string, ...ids: string[]): Promise<void> => {
    const ref = this._getRef(...ids).child(docId);
    await ref.remove();
  };

  // Retrieve all items under a reference
  _getCollectionAsync = async (ref: any): Promise<T[]> => {
    const snapshot = await ref.once('value');
    const data = snapshot.val();
    if (!data) return [];
    // Realtime Database returns an object; convert it to an array.
    const items = Object.keys(data).map((key) => data[key]);
    return items
      .map((item: any) => this._toModel(item))
      .filter((x) => x != null)
      .sort(this._orderBy);
  };

  // Update all items under a reference using a multi-path update.
  _updateAllAsync = async (
    ref: any,
    items: (T & TypeWithId)[],
  ): Promise<T[]> => {
    const updates: any = {};
    items.forEach((item) => {
      updates[item.id] = this._toObject(item);
    });
    await ref.update(updates);
    return items;
  };

  // Delete an entire collection (i.e. remove the reference).
  _deleteCollection = async (ref: any): Promise<void> => {
    await ref.remove();
  };

  // Utility comparators can remain the same.
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
    return (a?.order || 0) - (b?.order || 0);
  };
}
