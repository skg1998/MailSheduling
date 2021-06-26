const nodemailer = require('nodemailer');
import {
  IMail,
  IMailDocument,
  MailModel,
  RecurringEnum,
  SentMailModel,
} from '../models';
import * as moment from 'moment';
import * as scheduler from 'node-schedule';

var utcOffset = moment().utcOffset();
export class MailService {
  async sendMail(options: any) {
    console.log('mail', options);
    return;
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.email,
      cc: options.cc,
      subject: options.subject,
      text: options.message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(info.response);
      }
    });
  }

  async createMail(mail: IMail) {
    const createdMail = await MailModel.create(mail);
    this.scheduleMail(createdMail);
    return createdMail;
  }

  async scheduleMail(mail: IMailDocument) {
    const preparedScheduled = this.mailScheduleTime(mail);
    preparedScheduled.forEach((schedule) => {
      // console.log(schedule, typeof schedule)
      console.log(new Date(schedule));
      scheduler.scheduleJob(new Date(schedule), () => {
        this.triggerMail(mail);
        console.log(moment().format('LLLL'), 'Mail triggered');
      });
    });
  }

  mailScheduleTime(mail: IMailDocument) {
    const currentDateTime = moment();
    const preparedScheduled: string[] = [];
    const rec = mail.recurrence;
    if (rec.type === RecurringEnum.Seconds) {
      let tempDateTimeUnix = moment().unix();
      const tillDateTimeUnix = moment()
        .add(1, 'days')
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .unix();
      while (tillDateTimeUnix > tempDateTimeUnix) {
        tempDateTimeUnix += Number(rec.afterSeconds);
        preparedScheduled.push(moment.unix(tempDateTimeUnix).toLocaleString());
      }
    } else if (rec.type === RecurringEnum.Weekly) {
      const time = String(rec.time).split(':');
      const scheduledTime = moment().set({
        hours: Number(time[0]),
        minutes: Number(time[1]),
        seconds: 0,
      });
      if (
        rec.day === currentDateTime.get('day') &&
        currentDateTime.unix() < scheduledTime.unix()
      ) {
        preparedScheduled.push(
          moment.unix(scheduledTime.unix()).toLocaleString()
        );
      }
    } else if (rec.type === RecurringEnum.Monthly) {
      const time = String(rec.time).split(':');
      const scheduledTime = moment().set({
        hours: Number(time[0]),
        minutes: Number(time[1]),
        seconds: 0,
      });
      if (
        rec.date === currentDateTime.get('date') &&
        currentDateTime.unix() < scheduledTime.unix()
      ) {
        preparedScheduled.push(
          moment.unix(scheduledTime.unix()).toLocaleString()
        );
      }
    } else if (mail.recurrence.type === RecurringEnum.Yearly) {
      const time = String(rec.time).split(':');
      const scheduledTime = moment().set({
        hours: Number(time[0]),
        minutes: Number(time[1]),
        seconds: 0,
      });
      if (
        rec.month === currentDateTime.get('month') &&
        rec.date === currentDateTime.get('date') &&
        currentDateTime.unix() < scheduledTime.unix()
      ) {
        preparedScheduled.push(
          moment.unix(scheduledTime.unix()).toLocaleString()
        );
      }
    }

    return preparedScheduled;
  }

  async setDaySchedules() {
    const mails = await MailModel.find();
    // mails.forEach((mail) => this.scheduleMail(mail));
  }

  async triggerMail(mail: IMailDocument) {
    this.sendMail(mail);
    SentMailModel.create({ email: mail });
  }
}
