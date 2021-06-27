import { Document, Model, Schema, model } from 'mongoose';
import { hash, genSalt, compare } from 'bcryptjs';

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
      trim: true,
      unique: [true, 'Username already exists'],
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
      required: [true, 'Username is required'],
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

//Encrypt Password using Bcrypt
UserSchema.pre('save', async function (next) {
  const salt = await genSalt(10);
  (this as IUserDocument).password = await hash(
    (this as IUserDocument).password,
    salt
  );
});

export const UserModel = model<IUserDocument>('users', UserSchema);
