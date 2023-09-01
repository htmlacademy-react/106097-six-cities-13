import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace, RequestStatus } from '../../const';
import { User } from '../../types/user-data';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

const initialState: User = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: {
    name: '',
    avatarUrl: '',
    isPro: false,
    email: '',
    token: 'string',
  },
  sendingStatus: RequestStatus.Idle,
};

export const user = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    dropSendingStatus: (state) => {
      state.sendingStatus = RequestStatus.Idle;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.Unknown;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.pending, (state) => {
        state.sendingStatus = RequestStatus.Pending;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.sendingStatus = RequestStatus.Success;
        state.userInfo = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.sendingStatus = RequestStatus.Error;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

export const { dropSendingStatus } = user.actions;

