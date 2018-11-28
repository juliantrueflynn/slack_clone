import {
  WORKSPACE,
  MESSAGE,
  READ,
  USER_THREAD,
  SIGN_OUT,
} from '../actions/actionTypes';

const channelDisplayReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case MESSAGE.INDEX.REQUEST: {
      const { channelSlug } = action;
      return channelSlug;
    }
    case READ.INDEX.REQUEST:
      return 'unreads';
    case USER_THREAD.INDEX.REQUEST:
      return 'threads';
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return null;
    default:
      return state;
  }
};

export default channelDisplayReducer;
