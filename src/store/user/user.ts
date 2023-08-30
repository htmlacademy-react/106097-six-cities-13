import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { User, UserInfo } from '../../types/user';
import { AuthorizationStatusType } from '../../types/consts';
import { loginAction } from '../api-actions';

const initialState: User = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: {
    name: '',
    avatarUrl: '',
    isPro: false,
    email: '',
    token: '',
  }
};

export const user = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthorization: (state: User, action: PayloadAction<AuthorizationStatusType>) => {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginAction, (state, action: UserInfo) => {
        state.userInfo = action.payload;
      });
  }
});

export const { requireAuthorization } = user.actions;

