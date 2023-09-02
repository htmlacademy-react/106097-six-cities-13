import { RequestStatusType } from './consts';
import { Offer, Offers } from './offer';

export type FavoritesData = {
  offerId: Offer['id'];
  isFavorite: boolean;
};

export type Favorites = {
  favorites: Offer[];
  favoritesSendingStatus: RequestStatusType;
};
