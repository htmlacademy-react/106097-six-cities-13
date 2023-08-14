import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { Homepage } from '../pages/homepage';
import { NotFound } from '../pages/not-found';
import { AppRoute, AuthorizationStatus } from '../const';
import { Login } from '../pages/login';
import { Favorites } from '../pages/favorites';
import { PrivateRoute } from './private-route';
import { HelmetProvider } from 'react-helmet-async';
import { OfferComponent } from '../pages/offer';
import { nearbyOffers } from '../mocks/nearby-offers';
import { useAppSelector } from '../hooks';
import { selectors } from '../middleware/index';

export function App() {
  const offers = useAppSelector(selectors.offers);
  const offersNearby = nearbyOffers;

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root}>
            <Route index element={<Homepage offers={offers} />} />
            <Route
              path={AppRoute.Login}
              element={
                <PrivateRoute
                  restrictedFor={AuthorizationStatus.Auth}
                  redirectTo={AppRoute.Root}
                >
                  <Login />
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
            <Route path={`${AppRoute.Offer}/:id`} element={<OfferComponent offers={offers} nearbyOffers={offersNearby}/>} />
            <Route path={AppRoute.NotFound} element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
