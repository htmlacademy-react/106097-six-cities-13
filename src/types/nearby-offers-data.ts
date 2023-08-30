import { RequestStatusType } from './consts';
import { Offers } from './offer';

export type NearbyOffersData = {
  offersNearby: Offers;
  offersNearbySendingStatus: RequestStatusType;
}
