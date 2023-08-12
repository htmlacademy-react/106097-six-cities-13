import {createAction} from '@reduxjs/toolkit';
import { Offer } from '../types/offer';

export const Action = {
  CHANGE_CITY: 'changeCity',
  ADD_TO_FAVORITES: 'addToFavorites',
};

export const changeCity = createAction<string>(Action.CHANGE_CITY);
export const addToFavorites = createAction<Offer>(Action.ADD_TO_FAVORITES);
