import { Helmet } from 'react-helmet-async';
import { Offers } from '../types/offer';
import FavoriteCard from '../components/favorite-card';
import Header from '../components/header';
import Footer from '../components/footer';

type FavoritesProps = {
  favoriteOffers: Offers;
}

export default function Favorites({favoriteOffers}: FavoritesProps) {
  const cities: Set<string> = new Set (favoriteOffers.map((element) => element.city.name));
  const citiesArray: string[] = [];
  cities.forEach((element) => citiesArray.push(element));

  return (
    <div className="page">
      <Helmet>
        <title>Favorites</title>
      </Helmet>
      <Header favoriteOffers={favoriteOffers} isNavigationOn='true'/>
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
                    {favoriteOffers.filter((offer) => offer.city.name === city).map((element) => (
                      <FavoriteCard
                        key={element.id}
                        id={element.id}
                        isPremium={element.isPremium}
                        images={element.images}
                        price={element.price}
                        isFavorite={element.isFavorite}
                        rating={element.rating}
                        title={element.title}
                        type={element.type}
                      />))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
