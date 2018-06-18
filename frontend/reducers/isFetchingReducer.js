import { WORKSPACE, CHANNEL } from '../actions/actionTypes';

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
    default:
      return state;
  }
};

export default isFetchingReducer;
