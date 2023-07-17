import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Homepage from '../pages/homepage';
import { AppRoute } from '../const';
import Login from '../pages/login';
import Favorites from '../pages/favorites';
import Offer from '../pages/offer';

type AppProps = {
    placesCount: number;
}

export default function App({placesCount}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<Homepage placesCount={placesCount}/>} />
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path={AppRoute.Favorites} element={<Favorites />} />
          <Route path={AppRoute.Offer} element={<Offer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
