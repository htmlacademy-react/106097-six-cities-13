import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, MAX_RATING } from '../const';
import { cardTypesClasses } from '../const';
import { useAppDispatch } from '../hooks';
import { addToFavorites } from '../store/action';
import { Offer } from '../types/offer';

type PlaceCardProps = {
  offer: Offer;
  cardType: string;
};

export function PlaceCard({
  offer,
  cardType,
}: PlaceCardProps) {
  const [, setActiveCard] = useState('');

  const dispatch = useAppDispatch();
  const handeAddToFavorites = (offerToAdd: Offer) => {
    const favoriteOffer = offerToAdd;
    return function () {
      dispatch(addToFavorites(favoriteOffer));
    };
  };

  return (
    <article className={`${cardType}__card place-card`} onMouseOver={() => setActiveCard(offer.id)} onMouseOut={() => setActiveCard('')}>
      {offer.isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) : null}
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.images[0] ? offer.images[0] : '#'}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${cardType === cardTypesClasses.Favorites ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
            onClick={handeAddToFavorites(offer)}
          >
            <svg
              className="place-card__bookmark-icon"
              width="18"
              height="19"
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating / MAX_RATING * 100}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
