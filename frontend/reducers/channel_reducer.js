import { RECEIVE_CHANNELS, RECEIVE_CHANNEL } from '../actions/channel_actions';
import { RECEIVE_WORKSPACE } from '../actions/workspace_actions';

const channelReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CHANNELS :
      return action.channels;
    case RECEIVE_WORKSPACE :
      return action.workspace.channels;
    default :
      return state;
  }
};

export default channelReducer;