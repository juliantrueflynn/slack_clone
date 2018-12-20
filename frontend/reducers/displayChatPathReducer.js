import {
  WORKSPACE,
  MESSAGE,
  READ,
  USER_THREAD,
  SIGN_OUT,
} from '../actions/actionTypes';

const displayChatPathReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case WORKSPACE.SHOW.RECEIVE: {
      const { channels } = action.workspace;
      const firstChannel = channels.sort((a, b) => a.id - b.id)[0];

      return firstChannel.slug;
    }
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

export default displayChatPathReducer;
