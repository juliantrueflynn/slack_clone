import { MESSAGE, HISTORY, PIN } from '../actions/actionTypes';

const pinReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case HISTORY.INDEX.RECEIVE:
    case MESSAGE.INDEX.RECEIVE: {
      const { pins } = action.messages;

      return pins.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});
    }
    case PIN.CREATE.RECEIVE: {
      const { pin } = action;
      nextState = Object.assign({}, state);
      nextState[pin.id] = pin;
      return nextState;
    }
    case PIN.DESTROY.RECEIVE: {
      const { pin } = action;
      nextState = Object.assign({}, state);
      delete nextState[pin.id];
      return nextState;
    }
    default:
      return state;
  }
};

export default pinReducer;
