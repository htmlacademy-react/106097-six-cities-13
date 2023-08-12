import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/header';

export function NotFound() {
  return (
    <div className="page">
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <Header isNavigationOn='false'/>
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
