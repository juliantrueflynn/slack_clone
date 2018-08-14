import {
  SIGN_UP,
  SIGN_IN,
  SIGN_OUT,
  USER_APPEARANCE
} from '../actions/actionTypes';

const nullCurrentUser = { currentUser: null };

const sessionReducer = (state = nullCurrentUser, action) => {
  Object.freeze(state);
  let nextState;

  switch (action.type) {
    case SIGN_IN.RECEIVE:
    case SIGN_UP.RECEIVE: {
      const { currentUser } = action;
      return { currentUser };
    }
    case SIGN_OUT.RECEIVE:
      return nullCurrentUser;
    case USER_APPEARANCE.RECEIVE: {
      const { status } = action;
      nextState = Object.assign({}, state);
      nextState.currentUser.status = status;
      return nextState;
    }
    default:
      return state;
  }
};

export default sessionReducer;
