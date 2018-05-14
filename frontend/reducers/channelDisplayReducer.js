import { CHANNEL_REQUEST } from '../actions/channelActions';
import { WORKSPACE_REQUEST } from '../actions/workspaceActions';

const channelDisplayReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case WORKSPACE_REQUEST :
      return null;
    case CHANNEL_REQUEST :
      return action.channelSlug;
    default :
      return state;
  }
};

export default channelDisplayReducer;