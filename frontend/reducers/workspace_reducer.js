import merge from 'lodash/merge';
import { RECEIVE_WORKSPACES, RECEIVE_WORKSPACE } from '../actions/workspace_actions';

const workspaceReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_WORKSPACES :
      return action.workspaces;
    case RECEIVE_WORKSPACE :
      const workspace = action.workspace.workspace;
      workspace.channelIds = action.workspace.channels.map(channel => channel.id);
      const nextState = { [workspace.id]: workspace };
      return Object.assign({}, state, nextState);
    default :
      return state;
  }
};

export default workspaceReducer;