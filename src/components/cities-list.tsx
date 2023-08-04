type CitiesListProps = {
  cities: string[];
  activeCity: string;
}

export function CitiesList({cities, activeCity}: CitiesListProps) {

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
