import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get('HOST'),
            secure: configService.get('SSL') === 'true',
            port: Number(configService.get('PORT')),
            tls: {
              rejectUnauthorized: !configService.get('SSL'),
            },
            auth: {
              user: configService.get('MAIN_EMAIL'),
              pass: configService.get('EMAIL_PASS'),
            },
          },
          defaults: {
            from: `"No Reply" ${configService.get('MAIN_EMAIL')}`,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
