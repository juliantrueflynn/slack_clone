import merge from 'lodash/merge';
import { RECEIVE_CHANNEL } from '../actions/channel_actions';

const channelDisplayReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CHANNEL :
      return action.channel.channel.id;
    default :
      return state;
  }
};

export default channelDisplayReducer;