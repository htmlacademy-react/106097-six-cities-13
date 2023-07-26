import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus,
  redirectTo: AppRoute,
  children: JSX.Element;
}

export default function PrivateRoute({
  restrictedFor,
  redirectTo,
  children
}: PrivateRouteProps) {
  const authorizationStatus = AuthorizationStatus.NoAuth;

  return restrictedFor === authorizationStatus ? (
    <Navigate to={redirectTo} />
  ) : (
    children
  );
}
