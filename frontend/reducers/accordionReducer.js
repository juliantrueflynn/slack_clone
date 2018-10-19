import { ACCORDION_OPEN, ACCORDION_CLOSE } from '../actions/actionTypes';

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
    case ACCORDION_CLOSE: {
      const { accordionType, accordionItem } = action;
      nextState = Object.assign({}, state);
      nextState[accordionType][accordionItem] = false;
      return nextState;
    }
    default:
      return state;
  }
};

export default accordionReducer;
