import { Helmet } from 'react-helmet-async';
import { Offers } from '../types/offer';
import { PlaceCardList } from '../components/place-card-list';
import { Header } from '../components/header';
import { Map } from '../components/map';
import { CitiesList } from '../components/cities-list';
import { DEFAULT_CITY, mapClasses } from '../const';
import { useAppSelector } from '../hooks';
import { Sort } from '../components/sort';
import { selectors } from '../middleware/index';

type HomepageProps = {
  offers: Offers;
}

export function Homepage({offers}: HomepageProps) {
  const activeCity = useAppSelector(selectors.activeCity);
  const cityObject = offers.find((offer) => offer.city.name === activeCity);
  let city = cityObject?.city;
  if (city === undefined) {
    city = DEFAULT_CITY;
  }

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities homepage</title>
      </Helmet>
      <Header isNavigationOn='true'/>
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
              <b className="places__found">{offers.length} places to stay in {activeCity}</b>
              <Sort />
              <PlaceCardList />
            </section>
            <div className="cities__right-section">
              <Map city={city} points={offers} mapHeight={500} block={mapClasses.homepage}/>
            </div>
          </div>
        </div>
      </main>
    </div>

  );
}
