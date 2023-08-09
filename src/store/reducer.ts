import {createReducer} from '@reduxjs/toolkit';
import { changeCity, getOffers } from './action';
import { Offers } from '../types/offer';

type stateType = {
  city: string;
  offers: Offers;
}

const initialState = {
  city: 'Amsterdam',
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state: stateType, action) => {
      state.city = action.payload;
    })
    .addCase(getOffers, (state: stateType, action) => {
      state.offers = action.payload;
    });
});
