import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_SORT_TYPE, NameSpace, RequestStatus, SortTypes } from '../../const';
import { OffersData } from '../../types/offers-data';
import { fetchOfferAction, fetchOffersAction, fetchOffersNearbyAction, fetchReviewsAction } from '../api-actions';
import { OfferPreview } from '../../types/offer';

const initialState: OffersData = {
  offers: [],
  offersSendingStatus: RequestStatus.Idle,
  activeOffer: null,
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
    addToFavorites: (state, action: PayloadAction<string>) => {
      const offer: OfferPreview | undefined = state.offers.find((element: OfferPreview) => element.id === action.payload);
      if (!offer?.isFavorite && offer?.isFavorite !== undefined) {
        offer.isFavorite = true;
      } else if (offer?.isFavorite !== undefined) {
        offer.isFavorite = false;
      }
    },
    selectOffer: (state: OffersData, action: PayloadAction<string>) => {
      state.activeOffer = action.payload;
    },
    sort: (state: OffersData, action: PayloadAction<string>) => {
      state.sortType = action.payload;
      switch (action.payload) {
        case SortTypes.LOW_TO_HIGH:
          state.offers = [...offers].sort((a, b) => a.price - b.price);
          break;
        case SortTypes.HIGH_TO_LOW:
          state.offers = [...offers].sort((a, b) => b.price - a.price);
          break;
        case SortTypes.TOP_RATED:
          state.offers = [...offers].sort((a, b) => b.rating - a.rating);
          break;
        default:
          state.offers = offers;
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

export const { addToFavorites, selectOffer, sort } = offersData.actions;
