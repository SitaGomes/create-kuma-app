import { User } from 'src/data/models';
import { Service } from './service';
import { Firestore } from 'firebase-admin/firestore';

export class UserDelegateService extends Service<User> {
  private db: Firestore;

  constructor(db: Firestore) {
    super('users');
    this.db = db;
  }

  _getRef() {
    return this.db.collection('users');
  }

  _getCollectionGroup() {
    return this.db.collectionGroup('users');
  }

  _toModel(obj: any): User {
    const { id, email, orgId, createdDate, updatedDate } = obj;

    const cDate = createdDate?.toDate
      ? createdDate.toDate()
      : new Date(createdDate);
    const uDate = updatedDate?.toDate
      ? updatedDate.toDate()
      : new Date(updatedDate);

    const model = new User(email, orgId, id, cDate, uDate);

    return model;
  }

  _toObject(model: User) {
    return {
      id: model.id,
      email: model.email,
      orgId: model.orgId,
      createdDate: model.createdDate,
      updatedDate: new Date(),
    };
  }

  _orderBy(a: User, b: User): number {
    return Service.compareByDate(a, b);
  }

  create = async (user: User) => {
    const ref = this._getRef();
    const obj = this._toObject(user);

    return this._toModel(ref.doc(user.id).set(obj));
  };

  update = async (user: User) => {
    const ref = this._getRef();
    const obj = this._toObject(user);

    return this._toModel(ref.doc(user.id).update(obj));
  };

  delete = async (user: User) => {
    const ref = this._getRef();
    return this._toModel(ref.doc(user.id).delete());
  };

  findMany = async () => {
    return this._getCollectionAsync(this._getRef());
  };

  findUnique(id: string) {
    return this._getDocAsync(id);
  }

  findUniqueByEmail = async (email: string) => {
    const users = await this.findMany();
    return users.find((user) => user.email === email);
  };
}
