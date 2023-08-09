import { Helmet } from 'react-helmet-async';
import { Offer, Offers } from '../types/offer';
import { PlaceCardList } from '../components/place-card-list';
import { Header } from '../components/header';
import { Map } from '../components/map';
import { CitiesList } from '../components/cities-list';
import { useState } from 'react';
import { DEFAULT_ACTIVE_CITY, DEFAULT_CITY, mapClasses } from '../const';

type HomepageProps = {
  offers: Offers;
  favoriteOffers: Offers;
}

export function Homepage({offers, favoriteOffers}: HomepageProps) {
  const [activeCity, setActiveCity] = useState(DEFAULT_ACTIVE_CITY);
  const cityObject = offers.find((offer) => offer.city.name === activeCity);
  let city = cityObject?.city;
  if (city === undefined) {
    city = DEFAULT_CITY;
  }

  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities homepage</title>
      </Helmet>
      <Header favoriteOffers={favoriteOffers} isNavigationOn='true'/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations constainer">
            <CitiesList activeCity={activeCity}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <PlaceCardList offers={offers}/>
            </section>
            <div className="cities__right-section">
              <Map city={city} points={offers} selectedPoint={selectedOffer} mapHeight={500} block={mapClasses.homepage}/>
            </div>
          </div>
        </div>
      </main>
    </div>

  );
}
