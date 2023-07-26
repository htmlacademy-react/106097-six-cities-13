import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../const';

export default function Footer() {
  return (
    <footer className="footer">
      <Link className="footer__logo-link" to={useLocation().pathname === AppRoute.Root ? '#' : AppRoute.Root}>
        <img
          className="footer__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width="64"
          height="33"
        />
      </Link>
    </footer>
  );
}
