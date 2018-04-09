import { RECEIVE_CHANNELS, RECEIVE_CHANNEL } from '../actions/channel_actions';

const channelReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CHANNELS :
      return action.channels;
    default :
      return state;
  }
};

export default channelReducer;