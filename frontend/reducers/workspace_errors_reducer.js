import {
  WORKSPACES_FAILURE,
  FAILURE_WORKSPACE
} from '../actions/workspace_actions';

const workspaceErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACES_FAILURE :
    case FAILURE_WORKSPACE :
      return action.errors;
    default :
      return state;
  }
};

export default workspaceErrorsReducer;