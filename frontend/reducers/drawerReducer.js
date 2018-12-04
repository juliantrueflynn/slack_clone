import {
  WORKSPACE,
  SIGN_OUT,
  MESSAGE,
  USER,
  FAVORITE,
  CHANNEL,
  DRAWER_UPDATE,
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
    case MESSAGE.SHOW.REQUEST: {
      const { messageSlug: drawerSlug } = action;
      return { drawerType: 'convo', drawerSlug };
    }
    case USER.SHOW.REQUEST: {
      const { userSlug: drawerSlug } = action;
      return { drawerType: 'team', drawerSlug };
    }
    case FAVORITE.INDEX.REQUEST:
      return { drawerType: 'favorites', drawerSlug: null };
    case CHANNEL.SHOW.REQUEST:
      return { drawerType: 'details', drawerSlug: null };
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    default:
      return state;
  }
};

export default rightSidebarReducer;
