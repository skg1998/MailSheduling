import { UserService } from '../services';
import { Controller, Route, Tags, Res, TsoaResponse, Body, Post } from 'tsoa';
import { language } from '../config/lang';
import * as express from 'express';

import { IAccessTokenSuccess, IUser, UserModel } from '../models';

@Tags('Users')
@Route('/user')
export class UserController extends Controller {
  private userService: UserService;
  constructor() {
    super();
    this.userService = new UserService();
  }

  @Post('/register')
  public async register(
    @Body() user: IUser,
    @Res() badRequest: TsoaResponse<400, { message: string }>
  ): Promise<IAccessTokenSuccess> {
    const userCheck = await UserModel.findOne({ username: user.username });
    if (!userCheck) {
      const userData = await UserModel.create(user);
      const accessToken = this.userService.generateAccess(userData);
      return {
        user: userData,
        accessToken,
      };
    } else {
      badRequest(400, {
        message: language.accountAlreadyExist,
      });
    }
  }

  @Post('/login')
  public async login(
    @Body()
    user: {
      username: string;
      password: string;
    },
    @Res() unauthorized: TsoaResponse<401, { message: string }>
  ): Promise<IAccessTokenSuccess> {
    const userData = await UserModel.findOne({
      username: user.username,
    });

    if (userData) {
      const accessToken = this.userService.generateAccess(userData);
      return {
        user: userData,
        accessToken,
      };
    }

    unauthorized(401, {
      message: language.unauthorized,
    });
  }
}
