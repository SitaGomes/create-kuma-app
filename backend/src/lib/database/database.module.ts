import { Global, Module } from '@nestjs/common';
import { DatabaseClient } from './database.service';
import { FirestoreModule } from './singleton/firestore.module';

@Global()
@Module({
  imports: [FirestoreModule],
  providers: [DatabaseClient],
  exports: [DatabaseClient],
})
export class DatabaseModule {}
