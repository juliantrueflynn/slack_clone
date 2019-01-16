import {
  CHATROOM_PATH_UPDATE,
  WORKSPACE_SUB,
  WORKSPACE,
  SIGN_OUT,
} from '../actions/actionTypes';

const _defaultState = null;

const displayChatroomSlugReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case CHATROOM_PATH_UPDATE:
      return action.chatroomSlug;
    case WORKSPACE_SUB.CREATE.REQUEST:
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    default:
      return state;
  }
};

export default displayChatroomSlugReducer;
