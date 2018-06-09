import {
  WORKSPACES,
  WORKSPACE,
  CREATE_WORKSPACE,
  DELETE_WORKSPACE,
} from '../actions/actionTypes';

const workspaceReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACES.RECEIVE:
      nextState = action.workspaces;
      return Object.assign({}, state, nextState);
    case WORKSPACE.RECEIVE: {
      const { workspace: { workspace } } = action;
      nextState = { [workspace.slug]: workspace };
      return Object.assign({}, state, nextState);
    }
    case CREATE_WORKSPACE.RECEIVE: {
      nextState = { [action.workspace.slug]: action.workspace };
      return Object.assign({}, state, nextState);
    }
    case DELETE_WORKSPACE.RECEIVE:
      nextState = Object.assign({}, state);
      delete nextState[action.workspaceSlug];
      return nextState;
    default:
      return state;
  }
};

export default workspaceReducer;
