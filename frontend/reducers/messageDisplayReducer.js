import { MESSAGE, SIGN_OUT, WORKSPACE } from '../actions/actionTypes';

const messageDisplayReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case MESSAGE.SHOW.REQUEST:
      return action.messageSlug;
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.REQUEST:
      return null;
    default:
      return state;
  }
};

export default messageDisplayReducer;
