// services/firestore.service.ts
import { Injectable } from '@nestjs/common';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import {
  getDatabase as getRealtimeDatabase,
  Database,
} from 'firebase-admin/database';
import admin from 'firebase-admin';

// import * as serviceAccount from '../../../../barcode-prod-credentials.json'; //! TODO: change to your firebase credentials
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirestoreService {
  private db: Firestore;
  private realtimeDB: Database;

  constructor(private configService: ConfigService) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(
          //serviceAccount as admin.ServiceAccount,
          '',
        ),
        databaseURL: this.configService.get<string>('FIREBASE_DATABASE_URL'),
      });
    }
    this.db = getFirestore();
    this.realtimeDB = getRealtimeDatabase();
  }

  public getDatabase(): Firestore {
    return this.db;
  }

  public getRealtimeDB(): Database {
    return this.realtimeDB;
  }
}
