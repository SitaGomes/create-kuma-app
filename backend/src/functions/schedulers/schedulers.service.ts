import { Injectable } from '@nestjs/common';
import { getMonthlyReportTemplate } from 'src/data';
import { DatabaseClient, EmailService } from 'src/lib';

@Injectable()
export class SchedulersService {
  constructor(
    private db: DatabaseClient,
    private email: EmailService,
  ) {}

  async sendReport() {
    await this.email.sendEmail(
      getMonthlyReportTemplate({
        email: 'test@test.com',
        userName: 'test',
        productOfMonth: 'test',
        totalInStock: 0,
        totalScanned: 0,
        totalAmount: 0,
        currentMonth: 'test',
      }),
    );

    return { status: 'success', message: 'Emails sent successfully!' };
  }
}
