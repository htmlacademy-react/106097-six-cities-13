import { PlaceCard } from './place-card';
import { cardTypesClasses } from '../const';
import { useAppSelector } from '../hooks';
import { selectors } from '../middleware/index';
import { Loading } from './loading';

export function PlaceCardList() {
  const offers = useAppSelector(selectors.offers);
  const isOffersDataLoading = useAppSelector(selectors.offersLoadingStatus);
  return (
    <div className="cities__places-list places__list tabs__content">
      {isOffersDataLoading ? Loading() : null}
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
