import { IUser, IUserDocument } from '../models';
import constants from '../config/constants';
import * as jwt from 'jsonwebtoken';

export class UserService {
  constructor() {}

  generateAccess(user: IUserDocument) {
    return jwt.sign({ sub: user._id, user }, constants.jwt.secret, {
      expiresIn: constants.jwt.expiry,
    });
  }

  googleLogin(user: IUser): string {
    return '';
  }
}
