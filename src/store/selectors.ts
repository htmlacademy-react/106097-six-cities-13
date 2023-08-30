import { State } from '../types/state';

export const offers = (state: State) => state.offers;
export const offersLoadingStatus = (state: State) => state.offersSendingStatus;
export const offersNearby = (state: State) => state.offersNearby;
export const offersNearbyLoadingStatus = (state: State) => state.offersNearbySendingStatus;
export const favoriteOffers = (state: State) => state.offers.filter((offer) => offer.isFavorite === true);
export const activeOffer = (state: State) => state.activeOffer;
export const offerLoadingStatus = (state: State) => state.offerSendingStatus;
export const sortType = (state: State) => state.sortType;
export const activeCity = (state: State) => state.city;
export const authorizationStatus = (state: State) => state.authorizationStatus;
export const reviews = (state: State) => state.reviews;
export const reviewsLoadingStatus = (state: State) => state.reviewsSendingStatus;
