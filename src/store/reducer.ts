import {createReducer} from '@reduxjs/toolkit';
import { changeCity, addToFavorites, selectOffer, sort, requireAuthorization } from './action';
import { OfferPreview, Offers } from '../types/offer';
import { DEFAULT_ACTIVE_CITY, SortTypes, DEFAULT_SORT_TYPE, AuthorizationStatus, RequestStatus } from '../const';
import { AuthorizationStatusType, RequestStatusType } from '../types/consts';
import { Reviews } from '../types/review';
import { fetchOffersNearbyAction, fetchReviewsAction } from './api-actions';

type stateType = {
  city: string;
  sortType: string;
  authorizationStatus: AuthorizationStatusType;
  reviews: Reviews;
  reviewsSendingStatus: RequestStatusType;
  offersNearby: Offers;
  offersNearbySendingStatus: RequestStatusType;
}

const initialState: stateType = {
  city: DEFAULT_ACTIVE_CITY,
  sortType: DEFAULT_SORT_TYPE,
  authorizationStatus: AuthorizationStatus.Unknown,
  reviews: [],
  reviewsSendingStatus: RequestStatus.Idle,
  offersNearby: [],
  offersNearbySendingStatus: RequestStatus.Idle,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state: stateType, action) => {
      state.city = action.payload;
    })
    .addCase(addToFavorites, (state: stateType, action) => {
      const offer: OfferPreview | undefined = state.offers.find((element) => element.id === action.payload);
      if (!offer?.isFavorite && offer?.isFavorite !== undefined) {
        offer.isFavorite = true;
      } else if (offer?.isFavorite !== undefined) {
        offer.isFavorite = false;
      }
    })
    .addCase(selectOffer, (state: stateType, action) => {
      state.activeOffer = action.payload;
    })
    .addCase(sort, (state: stateType, action) => {
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
    })
    .addCase(fetchReviewsAction.pending, (state: stateType) => {
      state.reviewsSendingStatus = RequestStatus.Pending;
    })
    .addCase(fetchReviewsAction.fulfilled, (state: stateType, action) => {
      state.reviewsSendingStatus = RequestStatus.Success;
      state.reviews = action.payload;
    })
    .addCase(fetchReviewsAction.rejected, (state: stateType) => {
      state.reviewsSendingStatus = RequestStatus.Error;
    })
    .addCase(fetchOffersNearbyAction.pending, (state: stateType) => {
      state.offersNearbySendingStatus = RequestStatus.Pending;
    })
    .addCase(fetchOffersNearbyAction.fulfilled, (state: stateType, action) => {
      state.offersNearbySendingStatus = RequestStatus.Success;
      state.offersNearby = action.payload;
    })
    .addCase(fetchOffersNearbyAction.rejected, (state: stateType) => {
      state.offersNearbySendingStatus = RequestStatus.Error;
    })
    .addCase(requireAuthorization, (state: stateType, action) => {
      state.authorizationStatus = action.payload;
    });
});
