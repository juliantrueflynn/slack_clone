import { LOAD_WORKSPACE_PAGE } from '../actions/workspace_actions';
import { RECEIVE_CHANNEL } from '../actions/channel_actions';

const workspaceDisplayReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case LOAD_WORKSPACE_PAGE :
      console.log(action)
      return action.workspaceId;
    case RECEIVE_CHANNEL :
      return action.channel.channel.workspaceId;
    default :
      return state;
  }
};

export default workspaceDisplayReducer;