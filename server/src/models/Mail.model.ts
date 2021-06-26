import { Document, Model, Schema, model } from 'mongoose';

export enum RecurringEnum {
  Seconds = 'seconds',
  Weekly = 'weekly',
  Monthly = 'monthly',
  Yearly = 'yearly',
}

export interface IRecurrence {
  type: RecurringEnum;
  afterSeconds?: number;
  day?: number;
  date?: number;
  month?: number;
  time?: string;
  year?: number;
}

export interface IMail {
  to: string;
  cc: string[];
  subject: string;
  body: string;
  recurrence: IRecurrence;
  createdBy?: string;
}

export interface IMailDocument extends IMail, Document {}
export interface IMailModel extends Model<IMailDocument> {}

export const MailSchema = new Schema(
  {
    to: {
      type: String,
      required: true,
    },
    cc: {
      type: [String],
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    recurrence: {
      type: Object,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  {
    timestamps: true,
  }
);

export const MailModel = model<IMailDocument>('mails', MailSchema);
