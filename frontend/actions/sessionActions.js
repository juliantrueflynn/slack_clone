export const SESSION_SIGN_IN = 'SESSION_SIGN_IN';
export const SESSION_RECEIVE = 'SESSION_RECEIVE';
export const SESSION_SIGN_OUT = 'SESSION_SIGN_OUT';
export const SESSION_FAILURE = 'SESSION_FAILURE';

export const sessionSignIn = currentUser => ({
  type: SESSION_SIGN_IN,
  currentUser
});

export const sessionReceive = currentUser => ({
  type: SESSION_RECEIVE,
  currentUser
});

export const sessionSignOut = () => ({
  type: SESSION_SIGN_OUT
});

export const sessionFailure = errors => ({
  type: SESSION_FAILURE,
  errors
});