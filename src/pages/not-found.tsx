import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Offers } from '../types/offer';
import Header from '../components/header';

type NotFoundProps = {
  offers: Offers;
}

export default function NotFound({offers}: NotFoundProps): JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <Header offers={offers} isNavigationOn='false'/>
      <main className="page__main page__main--login">
        <div className="container">
          <section>
            <h1>404. Page not found</h1>
            <Link to="/">Вернуться на главную</Link>
          </section>
        </div>
      </main>
    </div>
  );
}
