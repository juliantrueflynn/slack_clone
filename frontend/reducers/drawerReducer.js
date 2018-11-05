import {
  DRAWER_OPEN,
  DRAWER_CLOSE,
  WORKSPACE,
  SIGN_OUT,
  MESSAGE,
  USER,
  FAVORITE,
  CHANNEL,
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
    case DRAWER_CLOSE:
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return _nullState;
    default:
      return state;
  }
};

export default rightSidebarReducer;
