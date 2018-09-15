import { WORKSPACE, SIGN_OUT } from '../actions/actionTypes';

const workspaceDisplayReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case WORKSPACE.CREATE.RECEIVE:
      return action.workspace.workspace.slug;
    case WORKSPACE.SHOW.REQUEST:
      return action.workspaceSlug;
    case SIGN_OUT.RECEIVE:
      return null;
    default:
      return state;
  }
};

export default workspaceDisplayReducer;
