import {
  OPEN_RIGHT_SIDEBAR, CLOSE_RIGHT_SIDEBAR
} from "../actions/right_sidebar_actions";

const rightSidebarReducer = (state = null, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case OPEN_RIGHT_SIDEBAR :
      nextState = {
        sidebarType: action.sidebarType,
        sidebarProps: action.sidebarProps,
      };
      return nextState;
    case CLOSE_RIGHT_SIDEBAR :
      return null;
    default :
      return state;
  }
};

export default rightSidebarReducer;