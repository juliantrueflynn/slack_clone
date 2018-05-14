import {
  WORKSPACES_FAILURE,
  WORKSPACE_FAILURE,
  CREATE_WORKSPACE_FAILURE
} from '../actions/workspace_actions';

const workspaceErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACES_FAILURE :
    case WORKSPACE_FAILURE :
    case CREATE_WORKSPACE_FAILURE :
      return action.errors;
    default :
      return state;
  }
};

export default workspaceErrorsReducer;