import { AppRoute, AuthorizationStatus } from '../const';

export type AuthorizationStatusType = (typeof AuthorizationStatus)[keyof typeof AuthorizationStatus];
export type AppRouteType = (typeof AppRoute)[keyof typeof AppRoute];
