import { SESSION_RECEIVE } from '../actions/sessionActions';

const _nullCurrentUser = {
  currentUser: null
};

export const sessionReducer = (state = _nullCurrentUser, action) => {
  Object.freeze(state);

  switch (action.type) {
    case SESSION_RECEIVE :
      const currentUser = action.currentUser;
      return Object.assign({}, { currentUser });
    default :
      return state;
  }
};

export default sessionReducer;