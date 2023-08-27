import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { selectors } from '../middleware';

type PrivateRouteProps = {
  restrictedFor: string;
  redirectTo: string;
  children: JSX.Element;
}

export function PrivateRoute({
  restrictedFor,
  redirectTo,
  children
}: PrivateRouteProps) {
  const authorizationStatus = useAppSelector(selectors.authorizationStatus);

  return restrictedFor === authorizationStatus ? (
    <Navigate to={redirectTo} />
  ) : (
    children
  );
}
