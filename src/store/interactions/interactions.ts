import { DEFAULT_ACTIVE_CITY, DEFAULT_SORT_TYPE, SortTypes } from '../../const';
import { Interactions } from '../../types/interactions';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Offer, OfferPreview } from '../../types/offer';

const initialState: Interactions = {
  city: DEFAULT_ACTIVE_CITY,
  sortType: DEFAULT_SORT_TYPE,
};

export const interactions = createSlice({
  name: NameSpace.Interactions,
  initialState,
  reducers: {
    changeCity: (state: Interactions, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<string>) => {
      const offer: OfferPreview | undefined = state.offers.find((element: OfferPreview) => element.id === action.payload);
      if (!offer?.isFavorite && offer?.isFavorite !== undefined) {
        offer.isFavorite = true;
      } else if (offer?.isFavorite !== undefined) {
        offer.isFavorite = false;
      }
    },
    selectOffer: (state, action: PayloadAction<Offer>) => {
      state.activeOffer = action.payload;
    },
    sort: (state, action: PayloadAction<string>) => {
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
    }
  },
});
