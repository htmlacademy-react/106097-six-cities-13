import { RequestStatusType } from './consts';
import { Offer, Offers } from './offer';
import { Reviews } from './review';

export type OffersData = {
  offers: Offers;
  offersSendingStatus: RequestStatusType;
  activeOffer: Offer | null;
  offerSendingStatus: RequestStatusType;
  sortType: string;
  offersNearby: Offers;
  offersNearbySendingStatus: RequestStatusType;
  reviews: Reviews;
  reviewsSendingStatus: RequestStatusType;
};
