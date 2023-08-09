import {createAction} from '@reduxjs/toolkit';
import { Offers } from '../types/offer';

export const Action = {
  CHANGE_CITY: 'changeCity',
  GET_OFFERS: 'getOffers',
};

export const changeCity = createAction<{city: string}>(Action.CHANGE_CITY);
export const getOffers = createAction<{offers: Offers}>(Action.GET_OFFERS);
