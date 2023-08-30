import { AuthorizationStatusType } from './consts';

export type User = {
  authorizationStatus: AuthorizationStatusType;
  userInfo: UserInfo;
}

export type UserInfo = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}
