export const CREATE_FAVORITE_REQUEST = 'CREATE_FAVORITE_REQUEST';
export const CREATE_FAVORITE_RECEIVE = 'CREATE_FAVORITE_RECEIVE';
export const CREATE_FAVORITE_FAILURE = 'CREATE_FAVORITE_FAILURE';
export const DELETE_FAVORITE_REQUEST = 'DELETE_FAVORITE_REQUEST';
export const DELETE_FAVORITE_RECEIVE = 'DELETE_FAVORITE_RECEIVE';
export const DELETE_FAVORITE_FAILURE = 'DELETE_FAVORITE_FAILURE';

export const createFavoriteRequest = messageId => ({
  type: CREATE_FAVORITE_REQUEST,
  messageId
});

export const createFavoriteReceive = favorite => ({
  type: CREATE_FAVORITE_RECEIVE,
  favorite
});

export const createFavoriteFailure = errors => ({
  type: CREATE_FAVORITE_FAILURE,
  errors
});

export const deleteFavoriteRequest = messageId => ({
  type: DELETE_FAVORITE_REQUEST,
  messageId
});

export const deleteFavoriteReceive = favorite => ({
  type: DELETE_FAVORITE_RECEIVE,
  favorite
});

export const deleteFavoriteFailure = errors => ({
  type: DELETE_FAVORITE_FAILURE,
  errors
});