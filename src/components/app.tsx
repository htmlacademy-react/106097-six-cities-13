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

export function App() {
  const offers = useAppSelector(selectors.offers);

  return (
    <HelmetProvider>
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
                restrictedFor={AuthorizationStatus.NoAuth}
                redirectTo={AppRoute.Login}
              >
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route path={`${AppRoute.Offers}/:id`} element={<OfferComponent />} />
          <Route path={AppRoute.NotFound} element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}
