import merge from 'lodash/merge';
import {
  RECEIVE_WORKSPACES,
  RECEIVE_WORKSPACE,
  CREATE_WORKSPACE,
  CREATE_WORKSPACE_SUCCESS
} from '../actions/workspace_actions';

const workspaceReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case RECEIVE_WORKSPACES :
      nextState = action.workspaces;
      return Object.assign({}, state, nextState);
    case CREATE_WORKSPACE_SUCCESS :
      nextState = { [action.workspace.id]: action.workspace };
      return Object.assign({}, state, nextState);
    case RECEIVE_WORKSPACE :
      const { workspace, channels } = action.workspace;
      workspace.channelIds = channels.map(channel => channel.id);
      nextState = { [workspace.id]: workspace };
      return Object.assign({}, state, nextState);
    default :
      return state;
  }
};

export default workspaceReducer;