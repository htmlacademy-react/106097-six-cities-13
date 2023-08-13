import { PlaceCard } from './place-card';
import { cardTypesClasses } from '../const';
import { useAppSelector } from '../hooks';

export function PlaceCardList() {
  const offers = useAppSelector((state) => state.offers);
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((element) => (
        <PlaceCard
          key={element.id}
          id={element.id}
          images={element.images}
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
