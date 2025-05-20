import { Controller, Post, Headers } from '@nestjs/common';
import { SchedulersService } from './schedulers.service';
import { ConfigService } from '@nestjs/config';
import { throwErrorFactory } from 'src/lib';
import { ERROR_STATUS } from 'src/data';

@Controller('schedulers')
export class SchedulersController {
  constructor(
    private readonly schedulersService: SchedulersService,
    private configService: ConfigService,
  ) {}

  @Post('send-report')
  async sendReport(@Headers('x-scheduler-key') key: string) {
    if (key !== this.configService.get<string>('SCHEDULER_SECRET_KEY')) {
      throwErrorFactory('Invalid key', ERROR_STATUS.UNAUTHORIZED);
    }
    return this.schedulersService.sendReport();
  }
}
