import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, MAX_RATING } from '../const';
import { cardTypesClasses } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectOffer } from '../store/offers-data/offers-data';
import { selectors } from '../middleware';
import { useState } from 'react';
import { redirectToRoute } from '../store/action';
import { addFavorite, deleteFavorite } from '../store/api-actions';

type PlaceCardProps = {
  id: string;
  image: string;
  price: number;
  isFavorite: boolean;
  rating: number;
  title: string;
  type: string;
  isPremium: boolean;
  cardType: string;
};

export function PlaceCard({
  id,
  image,
  price,
  isFavorite,
  rating,
  title,
  type,
  isPremium,
  cardType,
}: PlaceCardProps) {
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(selectors.authorizationStatus);

  const [isFavoriteItem, setIsFavoriteItem] = useState(isFavorite);

  const handleAddToFavorites = (offerId: string) => {
    if (authStatus === AuthorizationStatus.NoAuth || authStatus === AuthorizationStatus.Unknown) {
      dispatch(redirectToRoute(AppRoute.Login));
    }
    try {
      if (isFavoriteItem === false) {
        dispatch(addFavorite(offerId));
        setIsFavoriteItem(isFavoriteItem);
      }
      if (isFavoriteItem === true) {
        dispatch(deleteFavorite(offerId));
        setIsFavoriteItem(isFavoriteItem);
      }
    } finally {
      setIsFavoriteItem((prevFavoriteStatus) => !prevFavoriteStatus);
    }

  };

  const handleMouseEvents = (activeOfferId: string) => dispatch(selectOffer(activeOfferId));

  return (
    <article className={`${cardType}__card place-card`} onMouseOver={() => handleMouseEvents(id)} onMouseOut={() => handleMouseEvents('')}>
      {isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) : null}
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offers}/${id}`}>
          <img
            className="place-card__image"
            src={image}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${cardType === cardTypesClasses.Favorites ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${(isFavoriteItem && authStatus === AuthorizationStatus.Auth) ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
            onClick={() => handleAddToFavorites(id)}
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
            <span style={{ width: `${rating / MAX_RATING * 100}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offers}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
