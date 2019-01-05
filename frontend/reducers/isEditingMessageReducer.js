import {
  MESSAGE_EDITOR_TOGGLE,
  WORKSPACE_SUB,
  WORKSPACE,
  SIGN_OUT,
} from '../actions/actionTypes';

const _defaultState = null;

const isEditingMessageReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case MESSAGE_EDITOR_TOGGLE:
      return action.messageSlug;
    case WORKSPACE_SUB.CREATE.REQUEST:
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    default:
      return state;
  }
};

export default isEditingMessageReducer;
