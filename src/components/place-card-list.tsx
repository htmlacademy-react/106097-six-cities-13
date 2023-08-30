import { PlaceCard } from './place-card';
import { cardTypesClasses } from '../const';
import { Offers } from '../types/offer';

type PlaceCardListProps = {
  offers: Offers;
}

export function PlaceCardList({offers}: PlaceCardListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((element) => (
        <PlaceCard
          key={element.id}
          id={element.id}
          image={element.previewImage}
          price={element.price}
          isFavorite={element.isFavorite}
          rating={element.rating}
          title={element.title}
          type={element.type}
          cardType={cardTypesClasses.Cities}
          isPremium={element.isPremium}
        />))}
    </div>
  );
}
