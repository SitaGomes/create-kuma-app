import { DatabaseClient } from 'src/lib';

export class UserListener {
  constructor(private db: DatabaseClient) {
    this.db = db;
  }

  async listen() {
    return this.db.user._getCollectionGroup().onSnapshot(async (snapshot) => {
      for (const change of snapshot.docChanges()) {
        if (change.oldIndex > -1) {
          if (change.type === 'added') {
            await this.onCreate();
          }

          if (change.type === 'modified') {
            await this.onUpdate();
          }

          if (change.type === 'removed') {
            await this.onDelete();
          }
        }
      }
    });
  }

  private async onCreate() {
    return;
  }

  private async onUpdate() {
    return;
  }

  private async onDelete() {
    return;
  }
}
