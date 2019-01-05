import {
  DRAWER_UPDATE,
  WORKSPACE_SUB,
  WORKSPACE,
  SIGN_OUT,
} from '../actions/actionTypes';

const _defaultState = {
  drawerType: null,
  drawerSlug: null,
};

const rightSidebarReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case DRAWER_UPDATE: {
      const { drawerType, drawerSlug } = action;

      if (!drawerType) {
        return _defaultState;
      }

      return { drawerType, drawerSlug };
    }
    case WORKSPACE_SUB.CREATE.REQUEST:
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    default:
      return state;
  }
};

export default rightSidebarReducer;
