import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Homepage from '../pages/homepage';
import NotFound from '../pages/not-found';
import { AppRoute, AuthorizationStatus } from '../const';
import Login from '../pages/login';
import Favorites from '../pages/favorites';
import PrivateRoute from './private-route';
import { HelmetProvider } from 'react-helmet-async';
import { Offers } from '../types/offer';
import OfferComponent from '../pages/offer';

type AppProps = {
    offers: Offers;
}

export default function App({offers}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root}>
            <Route index element={<Homepage offers={offers}/>} />
            <Route
              path={AppRoute.Login}
              element={
                <PrivateRoute
                  restrictedFor={AuthorizationStatus.Auth}
                  redirectTo={AppRoute.Root}
                >
                  <Login offers={offers} />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Favorites}
              element={
                // <PrivateRoute
                //   restrictedFor={AuthorizationStatus.NoAuth}
                //   redirectTo={AppRoute.Login}
                // >
                  <Favorites offers={offers} />
                // </PrivateRoute>
              }
            />
            <Route path={`${AppRoute.Offer}/:id`} element={<OfferComponent offers={offers} />} />
            <Route path={AppRoute.NotFound} element={<NotFound offers={offers} />} />
            <Route path="*" element={<NotFound offers={offers} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
