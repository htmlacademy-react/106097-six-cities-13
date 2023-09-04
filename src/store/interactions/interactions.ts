import { DEFAULT_ACTIVE_CITY } from '../../const';
import { Interactions } from '../../types/interactions';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

const initialState: Interactions = {
  city: DEFAULT_ACTIVE_CITY,
};

export const interactions = createSlice({
  name: NameSpace.Interactions,
  initialState,
  reducers: {
    changeCity: (state: Interactions, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
});

export const { changeCity } = interactions.actions;
