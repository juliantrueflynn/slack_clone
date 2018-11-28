import { SIGN_UP, SIGN_IN, SIGN_OUT } from '../actions/actionTypes';

const _defaultState = { currentUser: null };

const sessionReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case SIGN_IN.RECEIVE:
    case SIGN_UP.RECEIVE: {
      const { currentUser } = action;
      return { currentUser };
    }
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    default:
      return state;
  }
};

export default sessionReducer;
