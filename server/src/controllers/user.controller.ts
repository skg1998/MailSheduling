import { UserService } from "../services";
import { Controller, Route, Get, Query, Tags, Res, TsoaResponse, Request, Body, Post } from "tsoa";
import { language } from "../config/lang";
import * as express from 'express';
import { ResponseMessage, IRegistersuccess, IUser, UserModel, IUserAccessAndRefreshToken } from "../models";
import constants from "../config/constants";

@Tags('Users')
@Route("/user")
export class UserController extends Controller {

    private userService: UserService
    constructor() {
        super();
        this.userService = new UserService();
    }

    @Post("/register")
    public async register(
        @Body() user: IUser & { otp: string },
        @Res() badRequest: TsoaResponse<400, { message: string }>,
    ): Promise<IRegistersuccess> {

        const validateOtp = await this.userService.validateRegistrationOtp(user);
        if (validateOtp) {
            const userCheck = await UserModel.findOne({ contactNumber: user.contactNumber });
            if (!userCheck) {
                const userData = await UserModel.create(user);
                const userAccess: IUserAccessAndRefreshToken = await this.userService.generateAccess(userData);
                return {
                    user: userData,
                    accessToken: userAccess.accessToken,
                    refreshtoken: userAccess.refreshToken
                }
            }else{
                badRequest(400, {
                    message: language.accountAlreadyExist
                })
            }
        }else{
            badRequest(400, {
                message: language.invalidOtp
            })
        }
    }

    @Post("/login")
    public async login(
        @Body() user: { 
            otp: string,
            contactNumber: number,
            countryCode: number
        },
        @Res() unauthorized: TsoaResponse<401, { message: string }>,
    ): Promise<IRegistersuccess> {

        const validateOtp = await this.userService.validateLoginOtp(user);
        if (validateOtp) {
            const userData = await UserModel.findOne({ contactNumber: user.contactNumber });
            if (userData) {
                const userAccess: IUserAccessAndRefreshToken = await this.userService.generateAccess(userData);
                return {
                    user: userData,
                    accessToken: userAccess.accessToken,
                    refreshtoken: userAccess.refreshToken
                }
            }
        }

        unauthorized(401, {
            message: language.unauthorized
        })
    }

    @Post("/refresh-token")
    public async getRefreshToken(
        @Body() data: {
            refreshToken: string,
            userId: string
        },
        @Res() unauthorized: TsoaResponse<401, { message: string }>,
    ): Promise<IUserAccessAndRefreshToken> {

        const user = await UserModel.findOne({ _id: data.userId });
        if (user) {
            const userAccess = await this.userService.generateAccessByRefreshToken({
                user,
                refreshToken: data.refreshToken
            });
            if(userAccess?.accessToken){
                return {
                    accessToken: userAccess.accessToken
                }
            }
        }
        unauthorized(401, {
            message: constants.errorTypes.auth.message
        })
    }
}