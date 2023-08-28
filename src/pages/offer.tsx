import { Helmet } from 'react-helmet-async';
import { Offers, Offer } from '../types/offer';
import { useParams } from 'react-router-dom';
import { MAX_NERBY_OFFERS, MAX_RATING, RequestStatus, mapClasses } from '../const';
import { capitalizeFirstLetter } from '../utils';
import { Header } from '../components/header';
import { CommentForm } from '../components/comment-form';
import { ReviewsList } from '../components/reviews-list';
import { Map } from '../components/map';
import { NearbyOffersList } from '../components/nearby-offers-list';
import { fetchOfferAction, fetchOffersNearbyAction, fetchReviewsAction } from '../store/api-actions';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useEffect } from 'react';
import { selectors } from '../middleware/index';
import { Loading } from '../components/loading';
import {toast} from 'react-toastify';
import { Reviews } from '../types/review';
import { NotFound } from './not-found';

export function OfferComponent() {
  const { id: offerId } = useParams();
  const dispatch = useAppDispatch();
  const sendingStatus = useAppSelector(selectors.offerLoadingStatus);
  if (sendingStatus === RequestStatus.Error) {
    toast.warn('Ошибка загрузки данных.');
  }

  useEffect(() => {
    if (offerId === undefined) {
      return;
    }
    dispatch(fetchOfferAction({offerId}));
    dispatch(fetchReviewsAction({offerId}));
    dispatch(fetchOffersNearbyAction({offerId}));
  }, [offerId, dispatch]);
  const offer: Offer | null = useAppSelector(selectors.activeOffer);
  const reviews: Reviews | null = useAppSelector(selectors.reviews);
  const nearbyOffers: Offers | null = useAppSelector(selectors.offersNearby);
  const offersForMap = [offer, ...nearbyOffers.slice(0, MAX_NERBY_OFFERS)];
  const offerLoadingStatus = useAppSelector(selectors.offerLoadingStatus);
  const offersNearbyLoadingStatus = useAppSelector(selectors.offersNearbyLoadingStatus);
  const reviewsLoadingStatus = useAppSelector(selectors.reviewsLoadingStatus);

  return (
    <div className="page">
      {offerLoadingStatus === RequestStatus.Pending ? <Loading /> : ''}
      {offerLoadingStatus === RequestStatus.Error ? <NotFound /> : ''}
      {offerLoadingStatus === RequestStatus.Success && offer !== null ?
        <>
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
                      Reviews · <span className="reviews__amount">{reviews.length}</span>
                    </h2>
                    {reviewsLoadingStatus === RequestStatus.Success ? <ReviewsList reviews={reviews} /> : ''}
                    <CommentForm />
                  </section>
                </div>
              </div>
              <section className="offer__map map">
                <Map city={offer.city} points={offersForMap} mapHeight={579} block={mapClasses.offer}/>
              </section>
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">
                  {nearbyOffers.length === 0 && 'No '}Other places in the neighbourhood
                </h2>
                {offersNearbyLoadingStatus === RequestStatus.Success ? <NearbyOffersList offers={nearbyOffers}/> : ''}
              </section>
            </div>
          </main>
        </> : ''}
    </div>
  );
}
