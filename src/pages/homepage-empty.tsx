import { Header } from '../components/header';
import { useAppSelector } from '../hooks';
import { CitiesList } from '../components/cities-list';
import { selectors } from '../middleware/index';

export function HomepageEmpty() {
  const activeCity = useAppSelector(selectors.activeCity);
  return (
    <div className="page page--gray page--main">
      <Header isNavigationOn='true'/>
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">
                  We could not find any property available at the moment in
                  {activeCity}
                </p>
              </div>
            </section>
            <div className="cities__right-section" />
          </div>
        </div>
      </main>
    </div>
  );
}
