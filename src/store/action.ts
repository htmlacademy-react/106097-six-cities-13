import {createAction} from '@reduxjs/toolkit';

export const Action = {
  CHANGE_CITY: 'changeCity',
  ADD_TO_FAVORITES: 'addToFavorites',
};

export const changeCity = createAction<string>(Action.CHANGE_CITY);
export const addToFavorites = createAction<string>(Action.ADD_TO_FAVORITES);
