import {createReducer} from '@reduxjs/toolkit';
import { requireAuthorization } from './action';
import { AuthorizationStatus } from '../const';
import { AuthorizationStatusType } from '../types/consts';

type stateType = {
  authorizationStatus: AuthorizationStatusType;
}

const initialState: stateType = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state: stateType, action) => {
      state.authorizationStatus = action.payload;
    });
});
