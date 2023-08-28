import { AppRoute, AuthorizationStatus, RequestStatus } from '../const';

export type AuthorizationStatusType = (typeof AuthorizationStatus)[keyof typeof AuthorizationStatus];
export type AppRouteType = (typeof AppRoute)[keyof typeof AppRoute];
export type RequestStatusType = (typeof RequestStatus)[keyof typeof RequestStatus];
