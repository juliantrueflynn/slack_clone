import merge from 'lodash/merge';
import { LOAD_CHANNEL_PAGE } from '../actions/channel_actions';

const channelDisplayReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case LOAD_CHANNEL_PAGE :
      return action.channelId;
    default :
      return state;
  }
};

export default channelDisplayReducer;