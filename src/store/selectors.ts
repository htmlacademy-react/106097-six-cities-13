import { NameSpace } from '../const';
import { State } from '../types/state';

export const offers = (state: State) => state[NameSpace.Data].offers;
export const offersLoadingStatus = (state: State) => state[NameSpace.Data].offersSendingStatus;
export const offersNearby = (state: State) => state[NameSpace.Data].offersNearby;
export const offersNearbyLoadingStatus = (state: State) => state[NameSpace.Data].offersNearbySendingStatus;
export const favoriteOffers = (state: State) => state[NameSpace.Data].offers.filter((offer) => offer.isFavorite === true);
export const activeOffer = (state: State) => state[NameSpace.Data].activeOffer;
export const offerLoadingStatus = (state: State) => state[NameSpace.Data].offerSendingStatus;
export const sortType = (state: State) => state[NameSpace.Data].sortType;
export const activeCity = (state: State) => state[NameSpace.Interactions].city;
export const authorizationStatus = (state: State) => state[NameSpace.User].authorizationStatus;
export const reviews = (state: State) => state[NameSpace.Data].reviews;
export const reviewsLoadingStatus = (state: State) => state[NameSpace.Data].reviewsSendingStatus;
