import { NearbyOffers } from '../types/offer';
import { NearbyOffer } from './nearby-offer';

type NearbyOffersListProps = {
  offers: NearbyOffers;
}

export function NearbyOffersList({offers}: NearbyOffersListProps) {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <NearbyOffer
          key={offer.id}
          image={offer.previewImage}
          price={offer.price}
          title={offer.title}
          type={offer.type}
          rating={offer.rating}
        />
      ))}
    </div>
  );
}
