import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, Extra, State } from '../types/state';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { Offer, Offers } from '../types/offer';
import { redirectToRoute, requireAuthorization } from './action';
import { UserData } from '../types/user-data';
import { saveToken } from '../services/token';
import { Review, ReviewData, Reviews } from '../types/review';
import { AuthData } from '../types/auth-data';
import { AuthorizedUser } from '../types/authorized-user';

export const fetchOffersAction = createAsyncThunk<Offers, undefined, Extra>(
  'data/fetchOffers',
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
  'data/fetchOffer',
  async ({offerId}, {extra: api}) => {
    try {
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
      return data;
    } catch {
      throw Error;
    }
  }
);

export const fetchReviewsAction = createAsyncThunk<Reviews, {offerId: Offer['id']}, Extra>(
  'data/fetchReviews',
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
  'data/fetchOffersNearby',
  async ({offerId}, {extra: api}) => {
    try {
      const {data} = await api.get<Offers>(`${APIRoute.Offers}/${offerId}${APIRoute.NearbyOffers}`);
      return data;
    } catch {
      throw Error;
    }
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, Extra>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<AuthorizedUser, AuthData, Extra>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  }
);

export const postReview = createAsyncThunk<Review, {reviewData: ReviewData; offerId: Offer['id']}, Extra>(
  'data/postReview',
  async ({reviewData, offerId}, {extra: api}) => {
    const {data} = await api.post<Review>(`${APIRoute.Reviews}/${offerId}`, reviewData);
    return data;
  }
);
