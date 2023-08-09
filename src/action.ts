import {createAction} from '@reduxjs/toolkit';
import { Offers } from './types/offer';

export const Action = {
  CHANGE_CITY: 'changeCity',
  GET_OFFERS: 'getOffers',
};

export const changeCity = createAction(Action.CHANGE_CITY, (city: string) => ({
  payload: city,
}));
export const getOffers = createAction(Action.GET_OFFERS, (offers: Offers) => ({
  payload: offers,
}));
