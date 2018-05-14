import {
  WORKSPACES_RECEIVE,
  WORKSPACE_RECEIVE,
  CREATE_WORKSPACE_RECEIVE,
  DELETE_WORKSPACE_RECEIVE
} from '../actions/workspaceActions';

const workspaceReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACES_RECEIVE :
      nextState = action.workspaces;
      return Object.assign({}, state, nextState);
    case WORKSPACE_RECEIVE :
      nextState = {
        [action.workspace.workspace.slug]: action.workspace.workspace
      };
      return Object.assign({}, state, nextState);
    case CREATE_WORKSPACE_RECEIVE :
      nextState = {
        [action.workspace.slug]: action.workspace
      };
      return Object.assign({}, state, nextState);
    case DELETE_WORKSPACE_RECEIVE :
      nextState = Object.assign({}, state);
      delete nextState[action.workspaceSlug];
      return nextState;
    default :
      return state;
  }
};

export default workspaceReducer;