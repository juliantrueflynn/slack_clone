import {
  RIGHT_SIDEBAR_OPEN,
  RIGHT_SIDEBAR_CLOSE,
  WORKSPACE,
  SIGN_OUT,
} from '../actions/actionTypes';

const rightSidebarReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RIGHT_SIDEBAR_OPEN: {
      const { sidebarType, sidebarProps } = action;
      return { sidebarType, sidebarProps };
    }
    case RIGHT_SIDEBAR_CLOSE:
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default rightSidebarReducer;
