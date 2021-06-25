import { Document, Model, Schema, model } from "mongoose";

export const enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface IUser {
    firstName: string;
    lastName: string;
    dob: Date;
    countryCode: number;
    contactNumber: number;
    gender: Gender
}

export interface IUserDocument extends IUser, Document { }
export interface IUserModel extends Model<IUserDocument> { }

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    countryCode: {
        type: Number,
        required: true,
    },
    contactNumber: {
        type: Number,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

export const UserModel = model<IUserDocument>("users", UserSchema);