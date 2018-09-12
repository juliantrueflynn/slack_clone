import { WORKSPACE, UNREAD } from '../actions/actionTypes';

const unreadReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState;

  switch (action.type) {
    case WORKSPACE.SHOW.RECEIVE: {
      const { workspace: { unreads } } = action;

      return unreads.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});
    }
    case UNREAD.CREATE.RECEIVE: {
      const { unread } = action;
      nextState = Object.assign({}, state);
      nextState[unread.id] = unread;
      return nextState;
    }
    case UNREAD.DESTROY.RECEIVE: {
      const { unread } = action;
      nextState = Object.assign({}, state);
      delete nextState[unread.id];
      return nextState;
    }
    default:
      return state;
  }
};

export default unreadReducer;
