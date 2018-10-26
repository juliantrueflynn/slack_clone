import { ACCORDION_OPEN, SIGN_OUT } from '../actions/actionTypes';

const _defaultState = { details: {} };

const accordionReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case ACCORDION_OPEN: {
      const { accordionType, accordionItem } = action;
      nextState = Object.assign({}, state);
      nextState[accordionType][accordionItem] = true;

      return nextState;
    }
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    default:
      return state;
  }
};

export default accordionReducer;
