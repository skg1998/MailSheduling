import { IUser } from '.';

export interface IAccessTokenSuccess {
  user: IUser;
  accessToken: string;
}
