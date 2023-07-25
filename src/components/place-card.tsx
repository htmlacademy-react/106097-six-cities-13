import { useState } from 'react';
import { Offer } from '../types/offer';

type PlaceCardProps = {
  offer: Offer;
};

export default function PlaceCard({offer}: PlaceCardProps): JSX.Element {
  const [, setActiveCard] = useState('');

  return (
    <article className="cities__card place-card" onMouseOver={() => setActiveCard(offer.id)} onMouseOut={() => setActiveCard('')}>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">

          <img
            className="place-card__image"
            src={offer.images[0] ? offer.images[0] : '#'}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
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
            <span style={{ width: `${offer.rating / 5 * 100}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
