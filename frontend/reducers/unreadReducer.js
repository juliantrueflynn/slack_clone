import { WORKSPACE, UNREAD, SIGN_OUT } from '../actions/actionTypes';

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
    case UNREAD.CREATE.RECEIVE:
    case UNREAD.UPDATE.RECEIVE: {
      const { unread } = action;
      nextState = Object.assign({}, state);
      nextState[unread.id] = unread;
      return nextState;
    }
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default unreadReducer;
