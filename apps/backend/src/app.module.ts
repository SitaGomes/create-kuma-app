import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './lib/database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './public/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
