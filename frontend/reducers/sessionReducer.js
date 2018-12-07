import merge from 'lodash.merge';
import {
  SIGN_UP,
  SIGN_IN,
  SIGN_OUT,
  USER,
} from '../actions/actionTypes';

const _defaultState = { currentUser: null };

const sessionReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case SIGN_IN.RECEIVE:
    case SIGN_UP.RECEIVE: {
      const { currentUser } = action;
      return { currentUser };
    }
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    case USER.UPDATE.RECEIVE: {
      const { user } = action;

      if (state.currentUser.id !== user.id) {
        return state;
      }

      nextState = {};
      nextState.currentUser.username = user.username;
      nextState.currentUser.email = user.email;

      return merge({}, state, nextState);
    }
    default:
      return state;
  }
};

export default sessionReducer;
