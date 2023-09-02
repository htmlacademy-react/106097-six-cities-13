import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { Favorites } from '../../types/favorites-data';
import { addFavorite, deleteFavorite, fetchFavoritesAction } from '../api-actions';

const initialState: Favorites = {
  favorites: [],
  favoritesSendingStatus: RequestStatus.Idle,
};

export const favoritesData = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state: Favorites) => {
        state.favoritesSendingStatus = RequestStatus.Pending;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state: Favorites, action) => {
        state.favoritesSendingStatus = RequestStatus.Success;
        state.favorites = action.payload;
      })
      .addCase(fetchFavoritesAction.rejected, (state: Favorites) => {
        state.favoritesSendingStatus = RequestStatus.Error;
      })
      .addCase(addFavorite.fulfilled, (state: Favorites, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(deleteFavorite.fulfilled, (state: Favorites, action) => {
        const updatedOffer = action.payload;
        state.favorites = state.favorites.filter((offer) => offer.id !== updatedOffer.id);
      });
  }
});
