import merge from 'lodash.merge';
import { CREATE_UNREAD } from '../actions/actionTypes';

const unreadConvoReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState;

  switch (action.type) {
    case CREATE_UNREAD: {
      const { unreadType, unreadSlug } = action;

      if (unreadType !== 'Message') {
        return state;
      }

      nextState = {};
      nextState[unreadSlug] = {};

      return merge({}, state, nextState);
    }
    default:
      return state;
  }
};

export default unreadConvoReducer;
