import { WORKSPACE } from '../actions/actionTypes';

const workspaceDisplayReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case WORKSPACE.CREATE.RECEIVE:
      return action.workspace.workspace.slug;
    case WORKSPACE.SHOW.REQUEST:
      return action.workspaceSlug;
    default:
      return state;
  }
};

export default workspaceDisplayReducer;
