export const DEFAULT_ACTIVE_CITY = 'Amsterdam';

export const DEFAULT_CITY = {
  'name': 'Amsterdam',
  'location': {
    'latitude': 52.3909553943508,
    'longitude': 4.85309666406198,
    'zoom': 8
  }
};

export const Cities: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const AppRoute = {
  Root: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer',
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
  Comments: '/comments',
  Login: '/login',
  Logout: '/logout',
};
