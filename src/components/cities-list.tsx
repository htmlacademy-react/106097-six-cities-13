import { useState } from 'react';
import { DEFAULT_ACTIVE_CITY } from '../const';

type CitiesListProps = {
  cities: string[];
}

export function CitiesList({cities}: CitiesListProps) {
  const [activeCity, setActiveCity] = useState(DEFAULT_ACTIVE_CITY);

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city}>
          <a className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`} href="#">
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
