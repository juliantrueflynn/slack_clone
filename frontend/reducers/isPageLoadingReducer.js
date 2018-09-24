import {
  LOAD_CHAT_PAGE,
  WORKSPACE,
  USER_THREAD,
  MESSAGE,
  READ,
} from '../actions/actionTypes';

const isPageLoadingReducer = (state = false, action) => {
  Object.freeze(state);

  switch (action.type) {
    case WORKSPACE.SHOW.REQUEST:
    case LOAD_CHAT_PAGE:
      return true;
    case MESSAGE.INDEX.RECEIVE:
    case READ.INDEX.RECEIVE:
    case USER_THREAD.INDEX.RECEIVE:
      return false;
    default:
      return state;
  }
};

export default isPageLoadingReducer;
