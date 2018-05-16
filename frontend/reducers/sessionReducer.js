import {
  SIGN_OUT_RECEIVE,
  SIGN_IN_RECEIVE,
  SIGN_UP_RECEIVE
} from '../actions/sessionActions';

const _nullCurrentUser = { currentUser: null };

export const sessionReducer = (state = _nullCurrentUser, action) => {
  Object.freeze(state);

  switch (action.type) {
    case SIGN_IN_RECEIVE :
    case SIGN_UP_RECEIVE :
      const currentUser = action.currentUser;
      return Object.assign({}, { currentUser });
    case SIGN_OUT_RECEIVE :
      return _nullCurrentUser;
    default :
      return state;
  }
};

export default sessionReducer;