import {
  SEARCH,
  WORKSPACE,
  MESSAGE,
  UNREAD,
  USER_THREAD,
  DRAWER_CLOSE,
  FAVORITE,
  USER,
  SIGN_OUT,
  CHANNEL,
  HISTORY,
} from '../actions/actionTypes';

const _defaultState = {
  search: false,
  workspace: false,
  channel: false,
  drawer: false,
  history: false,
};

const isLoadingReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  const nextState = Object.assign({}, state);
  switch (action.type) {
    case WORKSPACE.SHOW.REQUEST:
      nextState.workspace = true;
      nextState.channel = true;
      return nextState;
    case USER_THREAD.INDEX.REQUEST:
    case UNREAD.INDEX.REQUEST:
    case MESSAGE.INDEX.REQUEST:
      nextState.channel = true;
      return nextState;
    case MESSAGE.SHOW.REQUEST:
    case FAVORITE.INDEX.REQUEST:
    case USER.SHOW.REQUEST:
    case CHANNEL.SHOW.REQUEST:
    case DRAWER_CLOSE:
      nextState.drawer = true;
      return nextState;
    case SEARCH.INDEX.REQUEST:
      nextState.search = true;
      return nextState;
    case HISTORY.INDEX.REQUEST:
      nextState.history = true;
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
    case CHANNEL.SHOW.RECEIVE:
      nextState.drawer = false;
      return nextState;
    case SEARCH.INDEX.RECEIVE:
      nextState.search = false;
      return nextState;
    case HISTORY.INDEX.RECEIVE:
      nextState.history = false;
      return nextState;
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    default:
      return state;
  }
};

export default isLoadingReducer;
