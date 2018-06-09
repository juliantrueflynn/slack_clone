import { CHANNEL } from '../actions/actionTypes';

const channelDisplayReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case CHANNEL.SHOW.REQUEST: {
      return action.channelSlug;
    }
    default:
      return state;
  }
};

export default channelDisplayReducer;
