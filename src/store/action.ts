import { createAction } from '@reduxjs/toolkit';
import { AppRouteType } from '../types/consts';

export const Action = {
  CHANGE_CITY: 'changeCity',
  ADD_TO_FAVORITES: 'addToFavorites',
  SELECT_OFFER: 'selectOffer',
} as const;

export const changeCity = createAction<string>(Action.CHANGE_CITY);
export const addToFavorites = createAction<string>(Action.ADD_TO_FAVORITES);
export const selectOffer = createAction<string>(Action.SELECT_OFFER);
export const sort = createAction<string>('sort');
export const redirectToRoute = createAction<AppRouteType>('redirectToRoute');
