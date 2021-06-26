import { MailSchema } from '.';
import { Document, Model, Schema, model } from 'mongoose';

export interface ISentMail{
   
}


export interface ISentMailDocument extends ISentMail, Document {}
export interface ISentMailModel extends Model<ISentMailDocument> {}

const SentMailSchema = new Schema(
    {
      email: MailSchema
    },
    {
      timestamps: true,
    }
  );
  
  export const SentMailModel = model<ISentMailDocument>('sentmails', SentMailSchema);
   