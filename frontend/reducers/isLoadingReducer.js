import {
  SEARCH,
  WORKSPACE,
  MESSAGE,
  READ,
  USER_THREAD,
  FAVORITE,
  USER,
  SIGN_OUT,
  CHANNEL,
  DRAWER_UPDATE,
  PASSWORD,
  CHAT_PATH_UPDATE,
} from '../actions/actionTypes';

const _defaultState = {
  search: false,
  workspace: false,
  channel: false,
  channels: false,
  drawer: false,
  history: false,
  form: false,
};

const isLoadingReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case WORKSPACE.SHOW.REQUEST:
      return { ...state, workspace: true };
    case WORKSPACE.CREATE.REQUEST:
    case CHANNEL.CREATE.REQUEST:
    case CHANNEL.UPDATE.REQUEST:
    case PASSWORD.UPDATE.REQUEST:
    case USER.UPDATE.REQUEST:
      return { ...state, form: true };
    case CHAT_PATH_UPDATE:
      return { ...state, channel: true };
    case MESSAGE.INDEX.REQUEST:
      if (state.channel) {
        return state;
      }

      return { ...state, history: true };
    case DRAWER_UPDATE:
      return { ...state, drawer: true };
    case CHANNEL.INDEX.REQUEST:
      return { ...state, channels: true };
    case SEARCH.INDEX.REQUEST:
      return { ...state, search: true };
    case WORKSPACE.SHOW.RECEIVE:
      return { ...state, workspace: false };
    case WORKSPACE.CREATE.RECEIVE:
    case CHANNEL.CREATE.RECEIVE:
    case CHANNEL.UPDATE.RECEIVE:
    case PASSWORD.UPDATE.RECEIVE:
    case USER.UPDATE.RECEIVE:
    case WORKSPACE.CREATE.FAILURE:
    case CHANNEL.CREATE.FAILURE:
    case CHANNEL.UPDATE.FAILURE:
    case PASSWORD.UPDATE.FAILURE:
    case USER.UPDATE.FAILURE:
      return { ...state, form: false };
    case USER_THREAD.INDEX.RECEIVE:
    case READ.INDEX.RECEIVE:
    case MESSAGE.INDEX.RECEIVE:
      return { ...state, channel: false, history: false };
    case MESSAGE.SHOW.RECEIVE:
    case FAVORITE.INDEX.RECEIVE:
    case USER.SHOW.RECEIVE:
    case CHANNEL.SHOW.RECEIVE:
      return { ...state, drawer: false };
    case CHANNEL.INDEX.RECEIVE:
      return { ...state, channels: false };
    case SEARCH.INDEX.RECEIVE:
      return { ...state, search: false };
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    default:
      return state;
  }
};

export default isLoadingReducer;
