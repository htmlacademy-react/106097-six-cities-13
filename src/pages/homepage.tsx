import { Helmet } from 'react-helmet-async';
import { PlaceCardList } from '../components/place-card-list';
import { Header } from '../components/header';
import { Map } from '../components/map';
import { CitiesList } from '../components/cities-list';
import { RequestStatus, mapClasses } from '../const';
import { useAppSelector } from '../hooks';
import { Sort } from '../components/sort';
import { selectors } from '../middleware/index';
import { Loading } from '../components/loading';
import { NotFound } from './not-found';
import { HomepageEmpty } from './homepage-empty';

export function Homepage() {
  const offers = useAppSelector(selectors.offers);
  const offersLoadingStatus = useAppSelector(selectors.offersLoadingStatus);
  const activeCity = useAppSelector(selectors.activeCity);
  const filteredOffers = offers.filter((offer) => offer.city.name === activeCity);
  const cityObject = offers.find((offer) => offer.city.name === activeCity);
  const city = cityObject?.city;

  const selectedPoint = useAppSelector(selectors.selectedOffer);

  if (!filteredOffers) {
    return <HomepageEmpty />;
  }

  return (
    <>
      {offersLoadingStatus === RequestStatus.Pending && <Loading/>}
      {offersLoadingStatus === RequestStatus.Error && <NotFound/>}
      {offersLoadingStatus === RequestStatus.Success &&
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities homepage</title>
      </Helmet>
      <Header isNavigationOn='true'/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations constainer">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{filteredOffers.length} places to stay in {activeCity}</b>
              <Sort />
              <PlaceCardList offers={filteredOffers} />
            </section>
            <div className="cities__right-section">
              {city
                ? <Map city={city} points={filteredOffers} selectedPoint={selectedPoint} mapHeight={500} block={mapClasses.homepage}/>
                : ''}
            </div>
          </div>
        </div>
      </main>
    </div>}
    </>
  );
}
