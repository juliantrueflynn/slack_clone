import {
  OPEN_RIGHT_SIDEBAR,
  CLOSE_RIGHT_SIDEBAR,
} from '../actions/actionTypes';

const rightSidebarReducer = (state = null, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case OPEN_RIGHT_SIDEBAR: {
      const { sidebarType, sidebarProps } = action;
      nextState = { sidebarType, sidebarProps };

      return nextState;
    }
    case CLOSE_RIGHT_SIDEBAR:
      return null;
    default:
      return state;
  }
};

export default rightSidebarReducer;
