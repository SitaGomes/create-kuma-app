// clients/firestore.client.ts
import { Injectable } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { FirestoreService } from './singleton/firestore.service';
import { Database } from 'firebase-admin/database';
import {
  NotificationDelegateService,
  OrgDelegateService,
  UserDelegateService,
} from './delegate';

@Injectable()
export class DatabaseClient {
  public user: UserDelegateService;
  public org: OrgDelegateService;
  public notification: NotificationDelegateService;

  constructor(firestoreService: FirestoreService) {
    const db: Firestore = firestoreService.getDatabase();
    const realtimeDB: Database = firestoreService.getRealtimeDB();

    this.user = new UserDelegateService(db);
    this.org = new OrgDelegateService(db);
    this.notification = new NotificationDelegateService(realtimeDB);
  }
}
