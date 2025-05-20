import { Org } from 'src/data';
import { Service } from './service';
import { Firestore } from 'firebase-admin/firestore';

export class OrgDelegateService extends Service<Org> {
  private db: Firestore;

  constructor(db: Firestore) {
    super('orgs');
    this.db = db;
  }

  _getRef() {
    return this.db.collection('orgs');
  }

  _getCollectionGroup() {
    return this.db.collectionGroup('orgs');
  }

  _toModel(obj: any): Org {
    const { id, name, plan, createdDate, updatedDate } = obj;

    const cDate = createdDate?.toDate
      ? createdDate.toDate()
      : new Date(createdDate);
    const uDate = updatedDate?.toDate
      ? updatedDate.toDate()
      : new Date(updatedDate);

    const model = new Org(name, plan, id, cDate, uDate);

    return model;
  }

  _toObject(model: Org) {
    return {
      id: model.id,
      name: model.name,
      plan: model.plan,
      createdDate: model.createdDate,
      updatedDate: new Date(),
    };
  }

  _orderBy(a: Org, b: Org): number {
    return Service.compareByDate(a, b);
  }

  create = async (org: Org) => {
    const ref = this._getRef();
    const obj = this._toObject(org);
    ref.doc(org.id).set(obj);

    return obj;
  };

  update = async (org: Org) => {
    const ref = this._getRef();
    const obj = this._toObject(org);
    ref.doc(org.id).update(obj);

    return obj;
  };

  delete = async (orgId: string) => {
    const ref = this._getRef();
    ref.doc(orgId).delete();
    return;
  };

  findUnique = async (orgId: string) => {
    return this._getDocAsync(orgId);
  };

  findMany = async () => {
    return this._getCollectionAsync(this._getRef());
  };
}
