import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { NearbyOffersData } from '../../types/nearby-offers-data';
import { fetchOffersNearbyAction } from '../api-actions';

const initialState: NearbyOffersData = {
  offersNearby: [],
  offersNearbySendingStatus: RequestStatus.Idle,
};

export const nearbyOffersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersNearbyAction.pending, (state: NearbyOffersData) => {
        state.offersNearbySendingStatus = RequestStatus.Pending;
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state: NearbyOffersData, action) => {
        state.offersNearbySendingStatus = RequestStatus.Success;
        state.offersNearby = action.payload;
      })
      .addCase(fetchOffersNearbyAction.rejected, (state: NearbyOffersData) => {
        state.offersNearbySendingStatus = RequestStatus.Error;
      });
  }
});
