import {
  WORKSPACE,
  USER_THREAD,
  MESSAGE,
  UNREAD,
} from '../actions/actionTypes';

const isPageLoadingReducer = (state = false, action) => {
  Object.freeze(state);

  switch (action.type) {
    case WORKSPACE.SHOW.REQUEST:
    case MESSAGE.INDEX.REQUEST:
    case UNREAD.INDEX.REQUEST:
    case USER_THREAD.INDEX.REQUEST:
      return true;
    case MESSAGE.INDEX.RECEIVE:
    case UNREAD.INDEX.RECEIVE:
    case USER_THREAD.INDEX.RECEIVE:
      return false;
    default:
      return state;
  }
};

export default isPageLoadingReducer;
