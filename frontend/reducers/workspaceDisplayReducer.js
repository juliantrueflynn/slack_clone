import { WORKSPACE, CREATE_WORKSPACE, CHANNEL } from '../actions/actionTypes';

const workspaceDisplayReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case CREATE_WORKSPACE.RECEIVE:
      return action.workspace.slug;
    case WORKSPACE.REQUEST:
      return action.workspaceSlug;
    case CHANNEL.REQUEST: {
      return action.ui.workspaceSlug;
    }
    default:
      return state;
  }
};

export default workspaceDisplayReducer;
