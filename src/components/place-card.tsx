import { Link } from 'react-router-dom';
import { AppRoute, MAX_RATING } from '../const';
import { cardTypesClasses } from '../const';
import { useAppDispatch } from '../hooks';
import { addToFavorites, selectOffer } from '../store/action';

type PlaceCardProps = {
  id: string;
  images: string[];
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
  images,
  price,
  isFavorite,
  rating,
  title,
  type,
  isPremium,
  cardType,
}: PlaceCardProps) {
  const dispatch = useAppDispatch();

  const handeAddToFavorites = (offerId: string) => dispatch(addToFavorites(offerId));

  const handleMouseEvents = (activeOfferId: string) => dispatch(selectOffer(activeOfferId));

  return (
    <article className={`${cardType}__card place-card`} onMouseOver={() => handleMouseEvents(id)} onMouseOut={() => handleMouseEvents('')}>
      {isPremium ? (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      ) : null}
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={images[0] ? images[0] : '#'}
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
            className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
            onClick={() => handeAddToFavorites(id)}
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
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
