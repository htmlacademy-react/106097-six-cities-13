import { Helmet } from 'react-helmet-async';
import { Offers } from '../types/offer';
import FavoriteCard from '../components/favorite-card';
import Header from '../components/header';

type FavoritesProps = {
  offers: Offers;
}

export default function Favorites({offers}: FavoritesProps): JSX.Element {
  const favoriteOffers: Offers = offers.filter((element) => element.isFavorite);
  const cities: Set<string> = new Set (favoriteOffers.map((element) => element.city.name));
  const citiesArray: string[] = [];
  cities.forEach((element) => citiesArray.push(element));

  return (
    <div className="page">
      <Helmet>
        <title>Favorites</title>
      </Helmet>
      <Header offers={offers} isNavigationOn='true'/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {citiesArray.map((city: string) => (
                <li key={city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favoriteOffers.filter((offer) => offer.city.name === city).map((element) => (<FavoriteCard key={element.id} offer={element} />))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}
