import {createReducer} from '@reduxjs/toolkit';
import { changeCity } from './action';
import { Offers } from '../types/offer';
import { DEFAULT_ACTIVE_CITY } from '../const';
import { offers } from '../mocks/offers';

type stateType = {
  city: string;
  offers: Offers;
}

const initialState = {
  city: DEFAULT_ACTIVE_CITY,
  offers: offers,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state: stateType, action) => {
      state.city = action.payload;
      state.offers = offers.filter((offer) => offer.city.name === action.payload);
    });
});
