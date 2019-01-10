import merge from 'lodash.merge';
import {
  MESSAGE,
  PIN,
  WORKSPACE_SUB,
  WORKSPACE,
  SIGN_OUT,
} from '../actions/actionTypes';

const _defaultState = {};

const pinReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case MESSAGE.INDEX.RECEIVE: {
      const { pins } = action.messages;

      if (!pins) {
        return state;
      }

      nextState = pins.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});

      return merge({}, state, nextState);
    }
    case PIN.CREATE.RECEIVE: {
      const { pin } = action;

      nextState = {};
      nextState[pin.id] = pin;

      return merge({}, state, nextState);
    }
    case PIN.DESTROY.RECEIVE: {
      const { pin } = action;

      nextState = merge({}, state);
      delete nextState[pin.id];

      return nextState;
    }
    case WORKSPACE_SUB.CREATE.REQUEST:
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    default:
      return state;
  }
};

export default pinReducer;
