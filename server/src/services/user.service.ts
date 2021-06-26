import { IUser, IUserDocument } from '../models';
import constants from '../config/constants';
import * as jwt from 'jsonwebtoken';
import {compare} from 'bcryptjs'

export class UserService {
  constructor() {}

  generateAccess(user: IUserDocument) {
    return jwt.sign({ sub: user._id, user }, constants.jwt.secret, {
      expiresIn: constants.jwt.expiry,
    });
  }

  comparePassword(enteredPassword, password){
    return compare(enteredPassword, password);
  }
}
