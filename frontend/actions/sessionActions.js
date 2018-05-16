export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_RECEIVE = 'SIGN_IN_RECEIVE';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_RECEIVE = 'SIGN_UP_RECEIVE';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST';
export const SIGN_OUT_RECEIVE = 'SIGN_OUT_RECEIVE';
export const SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE';

export const signInRequest = currentUser => ({
  type: SIGN_IN_REQUEST,
  currentUser
});

export const signInReceive = currentUser => ({
  type: SIGN_IN_RECEIVE,
  currentUser
});

export const signInFailure = errors => ({
  type: SIGN_IN_FAILURE,
  errors
});

export const signUpRequest = currentUser => ({
  type: SIGN_UP_REQUEST,
  currentUser
});

export const signUpReceive = currentUser => ({
  type: SIGN_UP_RECEIVE,
  currentUser
});

export const signUpFailure = errors => ({
  type: SIGN_UP_FAILURE,
  errors
});

export const signOutRequest = () => ({
  type: SIGN_OUT_REQUEST
});

export const signOutReceive = () => ({
  type: SIGN_OUT_RECEIVE
});

export const signOutFailure = errors => ({
  type: SIGN_OUT_FAILURE,
  errors
});