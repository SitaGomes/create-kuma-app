import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, EmailModule, FirestoreModule } from './lib';
import { OrgModule } from './public';
import { AuthModule } from './auth';
import { ListenersModule, SchedulersModule } from './functions';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ListenersModule,
    SchedulersModule,
    FirestoreModule,
    DatabaseModule,
    AuthModule,
    EmailModule,
    OrgModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
