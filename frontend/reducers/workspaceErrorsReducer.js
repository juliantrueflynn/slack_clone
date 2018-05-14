import {
  WORKSPACES_FAILURE,
  WORKSPACE_FAILURE,
  CREATE_WORKSPACE_FAILURE,
  CREATE_WORKSPACE_REQUEST
} from '../actions/workspaceActions';

const workspaceErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACES_FAILURE :
    case WORKSPACE_FAILURE :
    case CREATE_WORKSPACE_FAILURE :
      return [...action.errors];
    case CREATE_WORKSPACE_REQUEST :
      return [];
    default :
      return state;
  }
};

export default workspaceErrorsReducer;