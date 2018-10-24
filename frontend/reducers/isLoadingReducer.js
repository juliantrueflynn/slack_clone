import {
  SEARCH,
  WORKSPACE,
  MESSAGE,
  UNREAD,
  USER_THREAD,
  DRAWER_CLOSE,
  FAVORITE,
  USER,
} from '../actions/actionTypes';

const _defaultState = {
  search: false,
  workspace: false,
  channel: false,
};

const isLoadingReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  const nextState = Object.assign({}, state);
  switch (action.type) {
    case WORKSPACE.SHOW.REQUEST:
      nextState.workspace = true;
      return nextState;
    case USER_THREAD.INDEX.REQUEST:
    case UNREAD.INDEX.REQUEST:
    case MESSAGE.INDEX.REQUEST:
      nextState.channel = true;
      return nextState;
    case MESSAGE.SHOW.REQUEST:
    case FAVORITE.INDEX.REQUEST:
    case USER.SHOW.REQUEST:
      nextState.drawer = true;
      return nextState;
    case SEARCH.INDEX.REQUEST:
      nextState.search = true;
      return nextState;
    case WORKSPACE.SHOW.RECEIVE:
      nextState.workspace = false;
      return nextState;
    case USER_THREAD.INDEX.RECEIVE:
    case UNREAD.INDEX.RECEIVE:
    case MESSAGE.INDEX.RECEIVE:
      nextState.channel = false;
      return nextState;
    case MESSAGE.SHOW.RECEIVE:
    case FAVORITE.INDEX.RECEIVE:
    case USER.SHOW.RECEIVE:
    case DRAWER_CLOSE:
      nextState.drawer = false;
      return nextState;
    case SEARCH.INDEX.RECEIVE:
      nextState.search = false;
      return nextState;
    default:
      return state;
  }
};

export default isLoadingReducer;
