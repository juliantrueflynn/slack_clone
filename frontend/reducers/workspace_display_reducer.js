import { RECEIVE_WORKSPACE } from '../actions/workspace_actions';

const workspaceDisplayReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_WORKSPACE :
      return action.workspace.id;
    default :
      return state;
  }
};

export default workspaceDisplayReducer;