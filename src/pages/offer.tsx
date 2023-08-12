import { Helmet } from 'react-helmet-async';
import { NearbyOffers, Offer, Offers } from '../types/offer';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { AppRoute, MAX_RATING, mapClasses } from '../const';
import { capitalizeFirstLetter } from '../utils';
import { Header } from '../components/header';
import { CommentForm } from '../components/comment-form';
import { ReviewsList } from '../components/reviews-list';
import { reviews } from '../mocks/reviews';
import { Map } from '../components/map';
import { NearbyOffersList } from '../components/nearby-offers-list';

type OfferProps = {
  offers: Offers;
  nearbyOffers: NearbyOffers;
};

export function OfferComponent({offers, nearbyOffers}: OfferProps) {
  const { id: offerId } = useParams();
  const offer: Offer = offers.filter((item) => item.id === offerId)[0];
  if (!offer) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>Offer details</title>
      </Helmet>
      <Header isNavigationOn='true'/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((element) => (
                <div key={element} className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={element}
                    alt="Apartment photo"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium
                ? (
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                ) : null}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${offer.rating / MAX_RATING * 100}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{capitalizeFirstLetter(offer.type)}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((element) =>
                    <li key={element} className="offer__inside-item">{element}</li>
                  )}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro
                    ? <span className="offer__user-status">Pro</span>
                    : null}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">1</span>
                </h2>
                <ReviewsList reviews={reviews} />
                <CommentForm />
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map city={offer.city} points={nearbyOffers} selectedPoint={offer} mapHeight={579} block={mapClasses.offer}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <NearbyOffersList offers={nearbyOffers}/>
          </section>
        </div>
      </main>
    </div>
  );
}
