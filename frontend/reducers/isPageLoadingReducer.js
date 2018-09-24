import { LOAD_CHAT_PAGE, WORKSPACE, USER_THREAD } from '../actions/actionTypes';

const isPageLoadingReducer = (state = false, action) => {
  Object.freeze(state);

  switch (action.type) {
    case LOAD_CHAT_PAGE:
      return true;
    case USER_THREAD.INDEX.RECEIVE:
      return false;
    case WORKSPACE.SHOW.REQUEST:
      return true;
    default:
      return state;
  }
};

export default isPageLoadingReducer;
