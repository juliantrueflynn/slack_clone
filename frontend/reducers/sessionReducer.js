import merge from 'lodash/merge';
import { RECEIVE_CURRENT_USER } from '../actions/sessionActions';

const _nullCurrentUser = {
  currentUser: null
};

export const sessionReducer = (state = _nullCurrentUser, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER :
      const currentUser = action.currentUser;
      return merge({}, { currentUser });
    default :
      return state;
  }
};

export default sessionReducer;