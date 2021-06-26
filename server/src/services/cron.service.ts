import * as scheduler from 'node-schedule';
import { MailService } from '.';

export class CronService {
  mailService: MailService;
  constructor() {
    this.mailService = new MailService();
    this.mailService.setDaySchedules();
    scheduler.scheduleJob('0 0 0 * * *', () => {
      this.mailService.setDaySchedules();
    });
  }
}
