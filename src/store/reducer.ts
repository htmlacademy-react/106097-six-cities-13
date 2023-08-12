import {createReducer} from '@reduxjs/toolkit';
import { changeCity, addToFavorites, selectOffer } from './action';
import { Offer, Offers } from '../types/offer';
import { DEFAULT_ACTIVE_CITY } from '../const';
import { offers } from '../mocks/offers';

type stateType = {
  city: string;
  offers: Offers;
  activeOffer: string;
}

const initialState = {
  city: DEFAULT_ACTIVE_CITY,
  offers: offers,
  activeOffer: '',
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
    });
});
