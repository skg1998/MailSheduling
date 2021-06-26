const nodemailer = require('nodemailer');
import { IMail } from '../models';

export class MailService {
  constructor() {}

  async sendMail(options) {
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
        return error;
      } else {
        return info.response;
      }
    });
  }
}
