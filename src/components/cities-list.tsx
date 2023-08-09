import { Cities } from '../const';

type CitiesListProps = {
  activeCity: string;
}

export function CitiesList({activeCity}: CitiesListProps) {

  return (
    <ul className="locations__list tabs__list">
      {Cities.map((city) => (
        <li className="locations__item" key={city}>
          <a className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`} href="#">
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
