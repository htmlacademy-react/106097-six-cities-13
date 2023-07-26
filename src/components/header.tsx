import { Link } from 'react-router-dom';
import { Offers } from '../types/offer';
import HeaderNavigation from './header-navigation';
import { AppRoute } from '../const';
import { useLocation } from 'react-router-dom';

type HeaderProps = {
  favoriteOffers: Offers;
  isNavigationOn: string;
}

export default function Header({favoriteOffers, isNavigationOn}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className={`header__logo-link ${useLocation().pathname === AppRoute.Root ? '' : 'header__logo-link--active'}`} to={useLocation().pathname === AppRoute.Root ? '#' : AppRoute.Root}>
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          {isNavigationOn ? <HeaderNavigation favoriteOffers={favoriteOffers} /> : null}
        </div>
      </div>
    </header>
  );
}
