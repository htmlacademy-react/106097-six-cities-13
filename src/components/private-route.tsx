import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === authorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
