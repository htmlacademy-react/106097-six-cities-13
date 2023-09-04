import { RequestStatusType } from './consts';
import { Offer } from './offer';

export type FavoritesData = {
  offerId: Offer['id'];
  isFavorite: boolean;
};

export type Favorites = {
  favorites: Offers;
  favoritesSendingStatus: RequestStatusType;
};
