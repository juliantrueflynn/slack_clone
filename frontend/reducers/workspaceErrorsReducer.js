import { WORKSPACE } from '../actions/actionTypes';

const workspaceErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case WORKSPACE.INDEX.FAILURE:
    case WORKSPACE.SHOW.FAILURE:
    case WORKSPACE.CREATE.FAILURE:
      return [...action.errors];
    case WORKSPACE.CREATE.REQUEST:
      return [];
    default:
      return state;
  }
};

export default workspaceErrorsReducer;
