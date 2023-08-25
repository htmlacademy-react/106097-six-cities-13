import { Route, Routes } from 'react-router-dom';
import { Homepage } from '../pages/homepage';
import { NotFound } from '../pages/not-found';
import { AppRoute, AuthorizationStatus } from '../const';
import { Login } from '../pages/login';
import { Favorites } from '../pages/favorites';
import { PrivateRoute } from './private-route';
import { HelmetProvider } from 'react-helmet-async';
import { OfferComponent } from '../pages/offer';
import { useAppSelector } from '../hooks';
import { selectors } from '../middleware/index';
import HistoryRouter from './history-route';
import browserHistory from '../browser-history';

export function App() {
  const authorizationStatus = useAppSelector(selectors.authorizationStatus);
  const offers = useAppSelector(selectors.offers);
  // const offersNearby = nearbyOffers;

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root}>
            <Route index element={<Homepage offers={offers} />} />
            <Route
              path={AppRoute.Login}
              element={<Login />}
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute
                  authorizationStatus={authorizationStatus}
                  restrictedFor={AuthorizationStatus.NoAuth}
                  redirectTo={AppRoute.Login}
                >
                  <Favorites />
                </PrivateRoute>
              }
            />
            {/* <Route path={`${AppRoute.Offer}/:id`} element={<OfferComponent offers={offers} nearbyOffers={offersNearby}/>} /> */}
            <Route path={AppRoute.NotFound} element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
