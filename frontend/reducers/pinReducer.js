import merge from 'lodash.merge';
import {
  MESSAGE,
  HISTORY,
  PIN,
  CHANNEL,
} from '../actions/actionTypes';

const pinReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case HISTORY.INDEX.RECEIVE:
    case MESSAGE.INDEX.RECEIVE: {
      const { pins } = action.messages;

      nextState = pins.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});

      return merge({}, state, nextState);
    }
    case CHANNEL.SHOW.RECEIVE: {
      const { pins } = action.channel;

      nextState = pins.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});

      return merge({}, state, nextState);
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
