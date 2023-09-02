import { createAsyncThunk } from '@reduxjs/toolkit';
import { Extra } from '../types/state';
import { APIRoute, AppRoute, FavoritesStatus, NameSpace } from '../const';
import { Offer, Offers } from '../types/offer';
import { redirectToRoute } from './action';
import { dropToken, saveToken } from '../services/token';
import { Review, ReviewData, Reviews } from '../types/review';
import { AuthData } from '../types/auth-data';
import { UserInfo } from '../types/user-data';
import { FavoritesData } from '../types/favorites-data';
import {toast} from 'react-toastify';

export const fetchOffersAction = createAsyncThunk<Offers, undefined, Extra>(
  `${NameSpace.Data}/fetchOffers`,
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get<Offers>(APIRoute.Offers);
      return data;
    } catch {
      throw Error;
    }
  }
);

export const fetchOfferAction = createAsyncThunk<Offer, {offerId: Offer['id']}, Extra>(
  `${NameSpace.Data}/fetchOffer`,
  async ({offerId}, {extra: api}) => {
    try {
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
      return data;
    } catch {
      throw Error;
    }
  }
);

export const fetchFavoritesAction = createAsyncThunk<Offers, undefined, Extra>(
  `${NameSpace.Data}/fetchFavorites`,
  async (_arg, {extra: api}) => {
    try {
      const {data} = await api.get<Offers>(`${APIRoute.Favorite}`);
      return data;
    } catch {
      throw Error;
    }
  }
);

export const addFavorite = createAsyncThunk<Offer, Offer['id'], Extra>(
  `${NameSpace.Data}/addFavorite`,
  async (offerId, {extra: api}) => {
    try {
      const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${offerId}/${FavoritesStatus.Add}`);
      return data;
    } catch (error) {
      toast.error(error.message);
      throw Error;
    }
  }
);

export const deleteFavorite = createAsyncThunk<Offer, Offer['id'], Extra>(
  `${NameSpace.Data}/deleteFavorite`,
  async (offerId, {extra: api}) => {
    try {
      const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${offerId}/${FavoritesStatus.Delete}`);
      return data;
    } catch (error) {
      toast.error(error.message);
      throw Error;
    }
  }
);

export const fetchReviewsAction = createAsyncThunk<Reviews, {offerId: Offer['id']}, Extra>(
  `${NameSpace.Data}/fetchReviews`,
  async ({offerId}, {extra: api}) => {
    try {
      const {data} = await api.get<Reviews>(`${APIRoute.Reviews}/${offerId}`);
      return data;
    } catch {
      throw Error;
    }
  }
);

export const fetchOffersNearbyAction = createAsyncThunk<Offers, {offerId: Offer['id']}, Extra>(
  `${NameSpace.Data}/fetchOffersNearby`,
  async ({offerId}, {extra: api}) => {
    try {
      const {data} = await api.get<Offers>(`${APIRoute.Offers}/${offerId}${APIRoute.NearbyOffers}`);
      return data;
    } catch {
      throw Error;
    }
  }
);

export const checkAuthAction = createAsyncThunk<UserInfo, undefined, Extra>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, {extra: api}) => {
    const { data } = await api.get<UserInfo>(APIRoute.Login);
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, Extra>(
  `${NameSpace.User}/logout`,
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export const loginAction = createAsyncThunk<UserInfo, AuthData, Extra>(
  `${NameSpace.User}/login`,
  async ({email, password}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<UserInfo>(APIRoute.Login, {email, password});
      saveToken(data.token);
      dispatch(redirectToRoute(AppRoute.Root));
      return data;
    } catch {
      throw Error;
    }
  }
);

export const postReview = createAsyncThunk<Review, {reviewData: ReviewData; offerId: Offer['id']}, Extra>(
  `${NameSpace.Data}/postReview`,
  async ({reviewData, offerId}, {extra: api}) => {
    const {data} = await api.post<Review>(`${APIRoute.Reviews}/${offerId}`, reviewData);
    return data;
  }
);
