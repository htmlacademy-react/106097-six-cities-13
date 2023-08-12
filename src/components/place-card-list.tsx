import { PlaceCard } from './place-card';
import { Offers } from '../types/offer';
import { cardTypesClasses } from '../const';

type PlaceCardListProps = {
  offers: Offers;
}

export function PlaceCardList({offers}: PlaceCardListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((element) => (
        <PlaceCard
          key={element.id}
          offer={element}
          cardType={cardTypesClasses.Cities}
        />))}
    </div>
  );
}
