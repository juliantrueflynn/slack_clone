import { WORKSPACE, CHANNEL } from '../actions/actionTypes';

const workspaceDisplayReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case WORKSPACE.CREATE.RECEIVE:
      return action.workspace.slug;
    case WORKSPACE.SHOW.REQUEST:
      return action.workspaceSlug;
    case CHANNEL.SHOW.REQUEST: {
      return action.ui.workspaceSlug;
    }
    default:
      return state;
  }
};

export default workspaceDisplayReducer;
