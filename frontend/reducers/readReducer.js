import { WORKSPACE, READ, SIGN_OUT } from '../actions/actionTypes';

const readReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState;

  switch (action.type) {
    case WORKSPACE.SHOW.RECEIVE: {
      const { workspace: { reads } } = action;

      return reads.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});
    }
    case READ.UPDATE.RECEIVE:
    case READ.CREATE.RECEIVE: {
      const { read } = action;
      nextState = Object.assign({}, state);
      nextState[read.id] = read;
      return nextState;
    }
    case READ.DESTROY.RECEIVE: {
      const { read: { id } } = action;
      nextState = Object.assign({}, state);

      if (nextState[id]) {
        delete nextState[id];
      }

      return nextState;
    }
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default readReducer;
