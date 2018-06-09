import { WORKSPACES, WORKSPACE, CREATE_WORKSPACE } from '../actions/actionTypes';

const workspaceErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case WORKSPACES.FAILURE:
    case WORKSPACE.FAILURE:
    case CREATE_WORKSPACE.FAILURE:
      return [...action.errors];
    case CREATE_WORKSPACE.REQUEST:
      return [];
    default:
      return state;
  }
};

export default workspaceErrorsReducer;
