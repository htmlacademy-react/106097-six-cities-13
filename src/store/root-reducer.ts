import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { offersData } from './offers-data/offers-data';
import { interactions } from './interactions/interactions';
import { user } from './user-data/user-data';

export const rootReducer = combineReducers({
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.Interactions]: interactions.reducer,
  [NameSpace.User]: user.reducer,
});
