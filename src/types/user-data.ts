import { AuthorizationStatusType, RequestStatusType } from './consts';

export type User = {
  authorizationStatus: AuthorizationStatusType;
  userInfo: UserInfo;
  sendingStatus: RequestStatusType;
}

export type UserInfo = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}
