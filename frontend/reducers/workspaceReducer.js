import { WORKSPACE } from '../actions/actionTypes';

const workspaceReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACE.INDEX.RECEIVE:
      nextState = action.workspaces;
      return Object.assign({}, state, nextState);
    case WORKSPACE.RECEIVE: {
      const { workspace: { workspace } } = action;
      nextState = { [workspace.slug]: workspace };
      return Object.assign({}, state, nextState);
    }
    case WORKSPACE.SHOW.RECEIVE: {
      nextState = { [action.workspace.slug]: action.workspace };
      return Object.assign({}, state, nextState);
    }
    case WORKSPACE.DELETE.RECEIVE:
      nextState = Object.assign({}, state);
      delete nextState[action.workspaceSlug];
      return nextState;
    default:
      return state;
  }
};

export default workspaceReducer;
