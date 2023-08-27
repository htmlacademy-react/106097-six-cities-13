import { State } from '../types/state';

export const offers = (state: State) => state.offers;
export const favoriteOffers = (state: State) => state.offers.filter((offer) => offer.isFavorite === true);
export const activeOffer = (state: State) => state.activeOffer;
export const sortType = (state: State) => state.sortType;
export const activeCity = (state: State) => state.city;
export const offersLoadingStatus = (state: State) => state.isOffersDataLoading;
export const authorizationStatus = (state: State) => state.authorizationStatus;
