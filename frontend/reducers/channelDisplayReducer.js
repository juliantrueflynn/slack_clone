import { MESSAGE, READ, USER_THREAD } from '../actions/actionTypes';

const channelDisplayReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case MESSAGE.SHOW.REQUEST: {
      const { channelSlug } = action;
      return channelSlug;
    }
    case READ.INDEX.REQUEST: {
      return 'unreads';
    }
    case USER_THREAD.INDEX.REQUEST:
      return 'threads';
    default:
      return state;
  }
};

export default channelDisplayReducer;
