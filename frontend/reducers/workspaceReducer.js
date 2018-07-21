import { WORKSPACE } from '../actions/actionTypes';

const workspaceReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACE.INDEX.RECEIVE:
      return Object.assign({}, state, action.workspaces);
    case WORKSPACE.SHOW.RECEIVE: {
      const { workspace: { workspace } } = action;
      nextState = { [workspace.slug]: workspace };
      return Object.assign({}, state, nextState);
    }
    case WORKSPACE.CREATE.RECEIVE: {
      const { workspace } = action;
      nextState = { [workspace.slug]: workspace };
      nextState[workspace.slug].memberIds = [workspace.ownerSlug];
      return Object.assign({}, state, nextState);
    }
    case WORKSPACE.DESTROY.RECEIVE:
      nextState = Object.assign({}, state);
      delete nextState[action.workspaceSlug];
      return nextState;
    default:
      return state;
  }
};

export default workspaceReducer;
