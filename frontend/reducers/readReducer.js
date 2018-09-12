import { WORKSPACE, MESSAGE, READ } from '../actions/actionTypes';

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
    case MESSAGE.INDEX.RECEIVE: {
      const { messages: { reads } } = action;

      nextState = Object.assign({}, state);
      reads.forEach((read) => {
        nextState[read.id] = read;
      });

      return nextState;
    }
    case READ.UPDATE.RECEIVE:
    case READ.CREATE.RECEIVE: {
      const { read } = action;
      nextState = Object.assign({}, state);
      nextState[read.id] = read;
      return nextState;
    }
    default:
      return state;
  }
};

export default readReducer;
