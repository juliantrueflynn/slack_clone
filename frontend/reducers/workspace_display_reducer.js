import { RECEIVE_WORKSPACE } from '../actions/workspace_actions';
import { RECEIVE_CHANNEL } from '../actions/channel_actions';

const workspaceDisplayReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_WORKSPACE :
      return action.workspace.workspace.id;
    case RECEIVE_CHANNEL :
      return action.channel.channel.workspaceId;
    default :
      return state;
  }
};

export default workspaceDisplayReducer;