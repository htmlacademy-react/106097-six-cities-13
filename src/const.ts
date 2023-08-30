export const DEFAULT_ACTIVE_CITY = 'Paris';
export const MAX_NERBY_OFFERS = 3;

export const Cities: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const AppRoute = {
  Root: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offers: '/offers',
  NotFound: '/404',
} as const;

export const AuthorizationStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN',
} as const;

export const MAX_RATING = 5;

export const cardTypesClasses = {
  Cities: 'cities',
  Nearby: 'near-places',
  Favorites: 'favorites',
};

export const mapClasses = {
  homepage: 'cities',
  offer: 'offer',
};

export const SortTypes = {
  POPULAR: 'Popular',
  LOW_TO_HIGH: 'Price: low to high',
  HIGH_TO_LOW: 'Price: high to low',
  TOP_RATED: 'Top rated first',
};

export const DEFAULT_SORT_TYPE = 'Popular';

export const APIRoute = {
  Offers: '/offers',
  NearbyOffers: '/nearby',
  Favorite: '/favorite',
  Reviews: '/comments',
  Login: '/login',
  Logout: '/logout',
};

export const RequestStatus = {
  Idle: 'Idle',
  Pending: 'Pending',
  Success: 'Success',
  Error: 'Error',
};

export const NameSpace = {
  Data: 'data',
  Interactions: 'interactions',
  User: 'user',
};
