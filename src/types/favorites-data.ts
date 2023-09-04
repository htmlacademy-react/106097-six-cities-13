import { RequestStatusType } from './consts';
import { Favorite, Offer } from './offer';

export type FavoritesData = {
  offerId: Offer['id'];
  isFavorite: boolean;
};

export type Favorites = {
  favorites: Favorite[];
  favoritesSendingStatus: RequestStatusType;
};
