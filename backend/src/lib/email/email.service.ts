import { Injectable } from '@nestjs/common';
import { throwErrorFactory } from '../error';
import { ERROR_STATUS } from 'src/data';
import { SendEmailParams } from './types';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail({ to, subject, html }: SendEmailParams) {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        template: html,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throwErrorFactory(
        'Failed to send email',
        ERROR_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
