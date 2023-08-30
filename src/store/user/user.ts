import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { User } from '../../types/user';
import { AuthorizationStatusType } from '../../types/consts';

const initialState: User = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const user = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthorization: (state: User, action: PayloadAction<AuthorizationStatusType>) => {
      state.authorizationStatus = action.payload;
    },
  },
});

export const { requireAuthorization } = user.actions;

