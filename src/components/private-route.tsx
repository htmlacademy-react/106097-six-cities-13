import { Navigate } from 'react-router-dom';
import { AuthorizationStatus } from '../const';

type PrivateRouteProps = {
  restrictedFor: string;
  redirectTo: string;
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
