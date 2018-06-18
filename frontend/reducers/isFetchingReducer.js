import { WORKSPACE, CHANNEL, OPEN_RIGHT_SIDEBAR, CLOSE_RIGHT_SIDEBAR, MESSAGE, FAVORITE } from '../actions/actionTypes';

const isFetchingReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACE.SHOW.REQUEST: {
      nextState = { workspace: true };
      return Object.assign({}, state, nextState);
    }
    case WORKSPACE.SHOW.RECEIVE: {
      nextState = { workspace: false };
      return Object.assign({}, state, nextState);
    }
    case CHANNEL.SHOW.REQUEST: {
      nextState = { channel: true };
      return Object.assign({}, state, nextState);
    }
    case CHANNEL.SHOW.RECEIVE: {
      nextState = { channel: false };
      return Object.assign({}, state, nextState);
    }
    case OPEN_RIGHT_SIDEBAR: {
      nextState = { rightSidebar: true };
      return Object.assign({}, state, nextState);
    }
    case MESSAGE.SHOW.RECEIVE: {
      nextState = { rightSidebar: false };
      return Object.assign({}, state, nextState);
    }
    case FAVORITE.INDEX.RECEIVE: {
      nextState = { rightSidebar: false };
      return Object.assign({}, state, nextState);
    }
    case CLOSE_RIGHT_SIDEBAR: {
      nextState = { rightSidebar: false };
      return Object.assign({}, state, nextState);
    }
    default:
      return state;
  }
};

export default isFetchingReducer;
