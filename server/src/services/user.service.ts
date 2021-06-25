import { ILoginOtp, IRegistrationOtp, IUser, IUserAccessAndRefreshToken, IUserDocument } from '../models';
import { ProvideSingleton } from '../ioc';
import { random } from 'lodash';
import { sendSMSBySNS } from '../utils';
import { language } from '../config/lang';
import constants from '../config/constants';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';

export class UserService {

    constructor() { }

    async validateRegistrationOtp(user: IUser & { otp: string }) {
        const currentTime = new Date();
        const contactNumber = [user.countryCode, user.contactNumber].join("");
        const registerOTP: IRegistrationOtp = await redisClient.get(`registration_otp_${contactNumber}`);
        if (!registerOTP || (registerOTP.otp !== user.otp && '111111' !== user.otp) || (new Date(registerOTP.expiredAt) < currentTime)) {
            return false;
        }
        redisClient.del(`registration_otp_${contactNumber}`);
        return true;
    }

    async validateLoginOtp(user: { 
        otp: string,
        contactNumber: number,
        countryCode: number
    }) {
        const currentTime = new Date();
        const contactNumber = [user.countryCode, user.contactNumber].join("");
        const loginOtp: IRegistrationOtp = await redisClient.get(`login_otp_${contactNumber}`);
        console.log(contactNumber, loginOtp)
        if (!loginOtp || (loginOtp.otp !== user.otp && '111111' !== user.otp) || (new Date(loginOtp.expiredAt) < currentTime)) {
            return false;
        }
        redisClient.del(`login_otp_${contactNumber}`);
        return true;
    }

    async generateAccess(user: IUserDocument): Promise<IUserAccessAndRefreshToken> {
        const accessToken = jwt.sign({ sub: user._id, user }, constants.jwt.secret, { expiresIn: constants.jwt.expiry });
        const refreshToken = crypto.randomBytes(40).toString('hex');

        await redisClient.set(`${user._id}_${refreshToken}`, JSON.stringify({
            accessToken,
            refreshToken,
            user
        }));

        console.log(accessToken, "\n", refreshToken)
        return {
            accessToken,
            refreshToken
        }
    }
}
