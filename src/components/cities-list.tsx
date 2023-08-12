import { Cities } from '../const';
import { useAppDispatch } from '../hooks';
import { changeCity } from '../store/action';

type CitiesListProps = {
  activeCity: string;
}

export function CitiesList({activeCity}: CitiesListProps) {
  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {Cities.map((city) => (
        <li className="locations__item" key={city}>
          <a className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`} href="#" onClick={() => dispatch(changeCity(city))}>
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
