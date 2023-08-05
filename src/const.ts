export const DEFAULT_ACTIVE_CITY = 'Amsterdam';

export const DEFAULT_CITY = {
  'name': 'Amsterdam',
  'location': {
    'latitude': 52.3909553943508,
    'longitude': 4.85309666406198,
    'zoom': 8
  }
};

export const AppRoute = {
  Root: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer',
  NotFound: '/404',
};

export const AuthorizationStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN',
};

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
