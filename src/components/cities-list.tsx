import { Link } from 'react-router-dom';
import { AppRoute, Cities } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectors } from '../middleware';
import { changeCity } from '../store/interactions/interactions';

export function CitiesList() {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(selectors.activeCity);
  const handleCityChange = (city: string) => {

    if (city !== activeCity) {
      dispatch(changeCity(city));
    }
  };

  return (
    <ul className="locations__list tabs__list">
      {Cities.map((city) => (
        <li className="locations__item" key={city} onClick={() => handleCityChange(city)}>
          <Link className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`} to={AppRoute.Root}>
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
