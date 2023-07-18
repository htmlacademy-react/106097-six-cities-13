import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Homepage from '../pages/homepage';
import NotFound from '../pages/not-found';
import { AppRoute, AuthorizationStatus } from '../const';
import Login from '../pages/login';
import Favorites from '../pages/favorites';
import Offer from '../pages/offer';
import PrivateRoute from './private-route';

type AppProps = {
    placesCount: number;
}

export default function App({placesCount}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<Homepage placesCount={placesCount}/>} />
          <Route
            path={AppRoute.Login}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.Auth}
                redirectTo={AppRoute.Root}
              >
                <Login/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.NoAuth}
                redirectTo={AppRoute.Login}
              >
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route path={`${AppRoute.Offer}/:id`} element={<Offer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
