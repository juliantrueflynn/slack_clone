import { WORKSPACE, SIGN_OUT, WORKSPACE_SUB } from '../actions/actionTypes';

const _defaultState = null;

const defaultChatroomSlugReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case WORKSPACE.SHOW.RECEIVE: {
      const { chatrooms } = action.workspace;
      const firstChannel = chatrooms.sort((a, b) => a.id - b.id)[0];

      return firstChannel.slug;
    }
    case WORKSPACE_SUB.CREATE.REQUEST:
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    default:
      return state;
  }
};

export default defaultChatroomSlugReducer;
