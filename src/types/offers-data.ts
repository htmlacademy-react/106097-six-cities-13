import { RequestStatusType } from './consts';
import { Offer, OfferPreview, Offers } from './offer';
import { Reviews } from './review';

export type OffersData = {
  offers: Offers;
  nonSortedOffers: Offers;
  offersSendingStatus: RequestStatusType;
  activeOffer: Offer | null;
  selectedOffer: OfferPreview | null;
  offerSendingStatus: RequestStatusType;
  sortType: string;
  offersNearby: Offers;
  offersNearbySendingStatus: RequestStatusType;
  reviews: Reviews;
  reviewsSendingStatus: RequestStatusType;
};
