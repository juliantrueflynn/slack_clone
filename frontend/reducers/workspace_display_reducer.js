import {
  LOAD_WORKSPACE_PAGE, CREATE_WORKSPACE_SUCCESS
} from '../actions/workspace_actions';
import { LOAD_CHANNEL_PAGE } from '../actions/channel_actions';

const workspaceDisplayReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case CREATE_WORKSPACE_SUCCESS :
      return action.workspace.id;
    case LOAD_WORKSPACE_PAGE :
      return action.workspaceId;
    case LOAD_CHANNEL_PAGE :
      return action.workspaceId;
    default :
      return state;
  }
};

export default workspaceDisplayReducer;