import {
  SEARCH,
  WORKSPACE,
  MESSAGE,
  READ,
  USER_THREAD,
  FAVORITE,
  USER,
  SIGN_OUT,
  CHATROOM,
  DRAWER_UPDATE,
  PASSWORD,
} from '../actions/actionTypes';

const _defaultState = {
  search: false,
  workspace: false,
  chatroom: false,
  chatrooms: false,
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
    case CHATROOM.CREATE.REQUEST:
    case CHATROOM.UPDATE.REQUEST:
    case PASSWORD.UPDATE.REQUEST:
    case USER.UPDATE.REQUEST:
      return { ...state, form: true };
    case USER_THREAD.INDEX.REQUEST:
    case READ.INDEX.REQUEST:
      return { ...state, chatroom: true };
    case MESSAGE.INDEX.REQUEST:
      return { ...state, chatroom: true, history: true };
    case DRAWER_UPDATE:
      return { ...state, drawer: true };
    case CHATROOM.INDEX.REQUEST:
      return { ...state, chatrooms: true };
    case SEARCH.INDEX.REQUEST:
      return { ...state, search: true };
    case WORKSPACE.SHOW.RECEIVE:
      return { ...state, workspace: false };
    case WORKSPACE.CREATE.RECEIVE:
    case CHATROOM.CREATE.RECEIVE:
    case CHATROOM.UPDATE.RECEIVE:
    case PASSWORD.UPDATE.RECEIVE:
    case USER.UPDATE.RECEIVE:
    case WORKSPACE.CREATE.FAILURE:
    case CHATROOM.CREATE.FAILURE:
    case CHATROOM.UPDATE.FAILURE:
    case PASSWORD.UPDATE.FAILURE:
    case USER.UPDATE.FAILURE:
      return { ...state, form: false };
    case USER_THREAD.INDEX.RECEIVE:
    case READ.INDEX.RECEIVE:
      return { ...state, chatroom: false };
    case MESSAGE.INDEX.RECEIVE:
      return { ...state, chatroom: false, history: false };
    case MESSAGE.SHOW.RECEIVE:
    case FAVORITE.INDEX.RECEIVE:
    case USER.SHOW.RECEIVE:
    case CHATROOM.SHOW.RECEIVE:
      return { ...state, drawer: false };
    case CHATROOM.INDEX.RECEIVE:
      return { ...state, chatrooms: false };
    case SEARCH.INDEX.RECEIVE:
      return { ...state, search: false };
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    default:
      return state;
  }
};

export default isLoadingReducer;
