import {
  MESSAGE,
  SIGN_OUT,
  WORKSPACE,
  DRAWER_CLOSE,
} from '../actions/actionTypes';

const messageDisplayReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case MESSAGE.SHOW.REQUEST:
      return action.messageSlug;
    case DRAWER_CLOSE:
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.REQUEST:
      return null;
    default:
      return state;
  }
};

export default messageDisplayReducer;
