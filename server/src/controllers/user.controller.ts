import { UserService } from '../services';
import { Controller, Route, Tags, Res, TsoaResponse, Body, Post } from 'tsoa';
import { language } from '../config/lang';
import * as express from 'express';

import { IAccessTokenSuccess, IUser, UserModel } from '../models';
import { OAuth2Client } from 'google-auth-library';

@Tags('Users')
@Route('/user')
export class UserController extends Controller {
  private userService: UserService;
  private googleservice: OAuth2Client;

  constructor() {
    super();
    this.userService = new UserService();
    this.googleservice = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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
    @Body() user: IUser,
    @Res() unauthorized: TsoaResponse<401, { message: string }>
  ): Promise<IAccessTokenSuccess> {
    const userData = await UserModel.findOne({ username: user.username });

    if (userData) {
      const isMatch = this.userService.comparePassword(
        user.password,
        userData.password
      );

      if (!isMatch) {
        unauthorized(401, {
          message: language.unauthorized,
        });
      }

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

  @Post('/google-login')
  public async googleLogin(
    @Body() user: any,
    @Res() unauthorized: TsoaResponse<401, { message: string }>
  ): Promise<IAccessTokenSuccess> {
    console.log('user', Object.assign({}, user));
    const { tokenId } = user;
    console.log('tokenId', tokenId);
    const ticket = await this.googleservice.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log('ticket', ticket);
    if (ticket.getPayload() && ticket.getPayload()?.email_verified) {
      const email = ticket.getPayload()?.email;
      const userData = await UserModel.findOne({ username: email });

      if (userData) {
        const accessToken = this.userService.generateAccess(userData);
        return {
          user: userData,
          accessToken,
        };
      } else {
        const password = `${email}${process.env.JWT_SECRET}`;

        user = new UserModel({ username: email, password: password });

        await user.save((err, data) => {
          if (err) {
            console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
            return {
              error: 'Google Login Failed',
            };
          }

          const accessToken = this.userService.generateAccess(data);
          return {
            user: data,
            accessToken,
          };
        });
      }
    }
    unauthorized(401, {
      message: language.unauthorized,
    });
  }
}
