import { SIGN_OUT, CHAT_PATH_UPDATE, WORKSPACE } from '../actions/actionTypes';

const _defaultState = null;

const displayChatPathReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case CHAT_PATH_UPDATE:
      return action.chatPath;
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    default:
      return state;
  }
};

export default displayChatPathReducer;
