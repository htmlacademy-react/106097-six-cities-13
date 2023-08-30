import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { ReviewsData } from '../../types/reviews-data';
import { fetchReviewsAction } from '../api-actions';

const initialState: ReviewsData = {
  reviews: [],
  reviewsSendingStatus: RequestStatus.Idle,
};

export const reviewsData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state: ReviewsData) => {
        state.reviewsSendingStatus = RequestStatus.Pending;
      })
      .addCase(fetchReviewsAction.fulfilled, (state: ReviewsData, action) => {
        state.reviewsSendingStatus = RequestStatus.Success;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state: ReviewsData) => {
        state.reviewsSendingStatus = RequestStatus.Error;
      });
  }
});
