import { WORKSPACE } from '../actions/actionTypes';

const isWorkspaceLoadingReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case WORKSPACE.SHOW.REQUEST: {
      return true;
    }
    case WORKSPACE.SHOW.RECEIVE: {
      return false;
    }
    default:
      return state;
  }
};

export default isWorkspaceLoadingReducer;
