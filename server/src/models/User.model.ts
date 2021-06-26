import { Document, Model, Schema, model } from 'mongoose';

export interface IUser {
  username: string;
  password?: string;
  googleId?: string;
}

export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<IUserDocument>('users', UserSchema);
