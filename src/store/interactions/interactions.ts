import { DEFAULT_ACTIVE_CITY, RequestStatus } from '../../const';
import { Interactions } from '../../types/interactions';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { postReview } from '../api-actions';

const initialState: Interactions = {
  city: DEFAULT_ACTIVE_CITY,
  postReviewStatus: RequestStatus.Idle,
};

export const interactions = createSlice({
  name: NameSpace.Interactions,
  initialState,
  reducers: {
    changeCity: (state: Interactions, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postReview.pending, (state) => {
        state.postReviewStatus = RequestStatus.Pending;
      })
      .addCase(postReview.fulfilled, (state) => {
        state.postReviewStatus = RequestStatus.Success;
      })
      .addCase(postReview.rejected, (state) => {
        state.postReviewStatus = RequestStatus.Error;
      });
  }
});

export const { changeCity } = interactions.actions;
