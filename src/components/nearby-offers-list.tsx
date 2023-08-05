import { NearbyOffers } from '../types/offer';
import { cardTypesClasses } from '../const';
import { PlaceCard } from './place-card';

type NearbyOffersListProps = {
  offers: NearbyOffers;
}

export function NearbyOffersList({offers}: NearbyOffersListProps) {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          id={offer.id}
          images={[offer.previewImage]}
          price={offer.price}
          isFavorite={offer.isFavorite}
          rating={offer.rating}
          title={offer.title}
          type={offer.type}
          cardType={cardTypesClasses.Cities}
          isPremium={offer.isPremium}
        />
      ))}
    </div>
  );
}
