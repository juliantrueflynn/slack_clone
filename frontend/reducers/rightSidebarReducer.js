import { RIGHT_SIDEBAR, WORKSPACE } from '../actions/actionTypes';

const rightSidebarReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RIGHT_SIDEBAR.OPEN:
      return action.sidebarType;
    case RIGHT_SIDEBAR.CLOSE:
      return null;
    case WORKSPACE.SHOW.RECEIVE:
      return null;
    default:
      return state;
  }
};

export default rightSidebarReducer;
