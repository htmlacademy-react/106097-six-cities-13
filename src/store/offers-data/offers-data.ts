import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { OffersData } from '../../types/offers-data';
import { fetchOfferAction, fetchOffersAction } from '../api-actions';

const initialState: OffersData = {
  offers: [],
  offersSendingStatus: RequestStatus.Idle,
  activeOffer: null,
  offerSendingStatus: RequestStatus.Idle,
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state: OffersData) => {
        state.offersSendingStatus = RequestStatus.Pending;
      })
      .addCase(fetchOffersAction.fulfilled, (state: OffersData, action) => {
        state.offersSendingStatus = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state: OffersData) => {
        state.offersSendingStatus = RequestStatus.Error;
      })
      .addCase(fetchOfferAction.pending, (state: OffersData) => {
        state.offerSendingStatus = RequestStatus.Pending;
      })
      .addCase(fetchOfferAction.fulfilled, (state: OffersData, action) => {
        state.offerSendingStatus = RequestStatus.Success;
        state.activeOffer = action.payload;
      })
      .addCase(fetchOfferAction.rejected, (state: OffersData) => {
        state.offerSendingStatus = RequestStatus.Error;
      });
  }
});

