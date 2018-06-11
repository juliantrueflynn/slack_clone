export const SET_STATUS = 'SET_STATUS';

export const setStatus = (userSlug, status) => ({
  type: SET_STATUS,
  userSlug,
  status,
});

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