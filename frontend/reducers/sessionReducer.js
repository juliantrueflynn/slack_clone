import { SIGN_UP, SIGN_IN, SIGN_OUT } from '../actions/actionTypes';

const nullCurrentUser = { currentUser: null };

export const sessionReducer = (state = nullCurrentUser, action) => {
  Object.freeze(state);

  switch (action.type) {
    case SIGN_IN.RECEIVE:
    case SIGN_UP.RECEIVE: {
      const { currentUser } = action;
      return Object.assign({}, { currentUser });
    }
    case SIGN_OUT.RECEIVE:
      return nullCurrentUser;
    default:
      return state;
  }
};

export default sessionReducer;
