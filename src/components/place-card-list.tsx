import PlaceCard from './place-card';
import { Offers } from '../types/offer';

type PlaceCardListProps = {
  offers: Offers;
}

export default function PlaceCardList({offers}: PlaceCardListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((element) => <PlaceCard offer={element} key={element.id} />)}
    </div>
  );
}
