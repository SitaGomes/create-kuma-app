import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { UserListener } from './all-listeners';
import { DatabaseClient } from 'src/lib';

@Injectable()
export class ListenersService implements OnModuleInit, OnModuleDestroy {
  private listeners: Array<() => void> = [];

  private userListener: UserListener;

  constructor(db: DatabaseClient) {
    this.userListener = new UserListener(db);
  }

  onModuleInit() {
    this.setupListeners();
  }

  onModuleDestroy() {
    this.listeners.forEach((unsubscribe) => unsubscribe());
  }

  private async setupListeners() {
    const user = await this.userListener.listen();
    this.listeners.push(user);
  }
}
