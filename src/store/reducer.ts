import {createReducer} from '@reduxjs/toolkit';
import { changeCity, addToFavorites, selectOffer, sort } from './action';
import { Offer, Offers } from '../types/offer';
import { DEFAULT_ACTIVE_CITY, SortTypes, DEFAULT_SORT_TYPE } from '../const';
import { offers } from '../mocks/offers';

type stateType = {
  city: string;
  offers: Offers;
  activeOffer: string;
  sortType: string;
}

const initialState: stateType = {
  city: DEFAULT_ACTIVE_CITY,
  offers: offers,
  activeOffer: '',
  sortType: DEFAULT_SORT_TYPE,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state: stateType, action) => {
      state.city = action.payload;
      state.offers = offers.filter((offer) => offer.city.name === action.payload);
    })
    .addCase(addToFavorites, (state: stateType, action) => {
      const offer: Offer | undefined = state.offers.find((element) => element.id === action.payload);
      if (!offer?.isFavorite && offer?.isFavorite !== undefined) {
        offer.isFavorite = true;
      } else if (offer?.isFavorite !== undefined) {
        offer.isFavorite = false;
      }
    })
    .addCase(selectOffer, (state: stateType, action) => {
      state.activeOffer = action.payload;
    })
    .addCase(sort, (state: stateType, action) => {
      state.sortType = action.payload;
      switch (action.payload) {
        case SortTypes.LOW_TO_HIGH:
          state.offers = [...offers].sort((a, b) => a.price - b.price);
          break;
        case SortTypes.HIGH_TO_LOW:
          state.offers = [...offers].sort((a, b) => b.price - a.price);
          break;
        case SortTypes.TOP_RATED:
          state.offers = [...offers].sort((a, b) => b.rating - a.rating);
          break;
        default:
          state.offers = offers;
      }
    });
});
