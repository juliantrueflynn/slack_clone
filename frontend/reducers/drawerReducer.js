import {
  DRAWER_OPEN,
  DRAWER_CLOSE,
  WORKSPACE,
  SIGN_OUT,
} from '../actions/actionTypes';

const _nullState = {
  drawerType: null,
  drawerSlug: null,
};

const rightSidebarReducer = (state = _nullState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case DRAWER_OPEN: {
      const { drawer } = action;
      return { ...drawer };
    }
    case DRAWER_CLOSE:
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return _nullState;
    default:
      return state;
  }
};

export default rightSidebarReducer;
