export const FAVORITES_REQUEST = 'FAVORITES_REQUEST';
export const FAVORITES_RECEIVE = 'FAVORITES_RECEIVE';
export const FAVORITES_FAILURE = 'FAVORITES_FAILURE';
export const CREATE_FAVORITE_REQUEST = 'CREATE_FAVORITE_REQUEST';
export const CREATE_FAVORITE_RECEIVE = 'CREATE_FAVORITE_RECEIVE';
export const CREATE_FAVORITE_FAILURE = 'CREATE_FAVORITE_FAILURE';
export const DELETE_FAVORITE_REQUEST = 'DELETE_FAVORITE_REQUEST';
export const DELETE_FAVORITE_RECEIVE = 'DELETE_FAVORITE_RECEIVE';
export const DELETE_FAVORITE_FAILURE = 'DELETE_FAVORITE_FAILURE';

export const favoritesRequest = () => ({
  type: FAVORITES_REQUEST
});

export const favoritesReceive = favorites => ({
  type: FAVORITES_RECEIVE,
  favorites
});

export const favoritesFailure = errors => ({
  type: FAVORITES_FAILURE,
  errors
});

export const createFavoriteRequest = messageSlug => ({
  type: CREATE_FAVORITE_REQUEST,
  messageSlug
});

export const createFavoriteReceive = favorite => ({
  type: CREATE_FAVORITE_RECEIVE,
  favorite
});

export const createFavoriteFailure = errors => ({
  type: CREATE_FAVORITE_FAILURE,
  errors
});

export const deleteFavoriteRequest = messageSlug => ({
  type: DELETE_FAVORITE_REQUEST,
  messageSlug
});

export const deleteFavoriteReceive = favorite => ({
  type: DELETE_FAVORITE_RECEIVE,
  favorite
});

export const deleteFavoriteFailure = errors => ({
  type: DELETE_FAVORITE_FAILURE,
  errors
});