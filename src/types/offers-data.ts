import { RequestStatusType } from './consts';
import { Offer, Offers } from './offer';

export type OffersData = {
  offers: Offers;
  offersSendingStatus: RequestStatusType;
  activeOffer: Offer | null;
  offerSendingStatus: RequestStatusType;
  sortType: string;
};
