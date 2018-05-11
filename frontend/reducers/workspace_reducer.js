import {
  RECEIVE_WORKSPACES,
  RECEIVE_WORKSPACE,
  CREATE_WORKSPACE_SUCCESS,
  DELETE_WORKSPACE_SUCCESS
} from '../actions/workspace_actions';

const workspaceReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case RECEIVE_WORKSPACES :
      nextState = action.workspaces;
      return Object.assign({}, state, nextState);
    case RECEIVE_WORKSPACE :
      nextState = {
        [action.workspace.workspace.slug]: action.workspace.workspace
      };
      return Object.assign({}, state, nextState);
    case CREATE_WORKSPACE_SUCCESS :
      nextState = {
        [action.workspace.slug]: action.workspace
      };
      return Object.assign({}, state, nextState);
    case DELETE_WORKSPACE_SUCCESS :
      nextState = Object.assign({}, state);
      delete nextState[action.workspaceSlug];
      return nextState;
    default :
      return state;
  }
};

export default workspaceReducer;