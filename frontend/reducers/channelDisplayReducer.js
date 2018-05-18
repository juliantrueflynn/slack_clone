import { CHANNEL_REQUEST } from '../actions/channelActions';

const channelDisplayReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case CHANNEL_REQUEST : {
      return action.channelSlug;
    }
    default :
      return state;
  }
};

export default channelDisplayReducer;