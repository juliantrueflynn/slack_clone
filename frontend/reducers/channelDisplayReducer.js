import { WORKSPACE, SIGN_OUT, LOAD_CHAT_PAGE } from '../actions/actionTypes';

const channelDisplayReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case LOAD_CHAT_PAGE: {
      const { pagePath } = action;
      return pagePath;
    }
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return null;
    default:
      return state;
  }
};

export default channelDisplayReducer;
