import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_SORT_TYPE, NameSpace, RequestStatus, SortTypes } from '../../const';
import { OffersData } from '../../types/offers-data';
import { fetchOfferAction, fetchOffersAction, fetchOffersNearbyAction, fetchReviewsAction } from '../api-actions';

const initialState: OffersData = {
  offers: [],
  nonSortedOffers: [],
  offersSendingStatus: RequestStatus.Idle,
  activeOffer: null,
  selectedOffer: null,
  offerSendingStatus: RequestStatus.Idle,
  sortType: DEFAULT_SORT_TYPE,
  offersNearby: [],
  offersNearbySendingStatus: RequestStatus.Idle,
  reviews: [],
  reviewsSendingStatus: RequestStatus.Idle,
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    selectOffer: (state: OffersData, action: PayloadAction<string>) => {
      state.selectedOffer = state.nonSortedOffers.filter((offer) => offer.id === action.payload)[0];
    },
    sort: (state: OffersData, action: PayloadAction<string>) => {
      state.sortType = action.payload;
      switch (action.payload) {
        case SortTypes.LOW_TO_HIGH:
          state.offers = [...state.nonSortedOffers].sort((a, b) => a.price - b.price);
          break;
        case SortTypes.HIGH_TO_LOW:
          state.offers = [...state.nonSortedOffers].sort((a, b) => b.price - a.price);
          break;
        case SortTypes.TOP_RATED:
          state.offers = [...state.nonSortedOffers].sort((a, b) => b.rating - a.rating);
          break;
        default:
          state.offers = state.nonSortedOffers;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state: OffersData) => {
        state.offersSendingStatus = RequestStatus.Pending;
      })
      .addCase(fetchOffersAction.fulfilled, (state: OffersData, action) => {
        state.offersSendingStatus = RequestStatus.Success;
        state.offers = action.payload;
        state.nonSortedOffers = action.payload;
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
      })
      .addCase(fetchOffersNearbyAction.pending, (state: OffersData) => {
        state.offersNearbySendingStatus = RequestStatus.Pending;
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state: OffersData, action) => {
        state.offersNearbySendingStatus = RequestStatus.Success;
        state.offersNearby = action.payload;
      })
      .addCase(fetchOffersNearbyAction.rejected, (state: OffersData) => {
        state.offersNearbySendingStatus = RequestStatus.Error;
      })
      .addCase(fetchReviewsAction.pending, (state: OffersData) => {
        state.reviewsSendingStatus = RequestStatus.Pending;
      })
      .addCase(fetchReviewsAction.fulfilled, (state: OffersData, action) => {
        state.reviewsSendingStatus = RequestStatus.Success;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state: OffersData) => {
        state.reviewsSendingStatus = RequestStatus.Error;
      });
  }
});

export const { selectOffer, sort } = offersData.actions;
