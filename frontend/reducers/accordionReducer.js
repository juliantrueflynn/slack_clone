import {
  ACCORDION_OPEN,
  WORKSPACE_SUB,
  WORKSPACE,
  SIGN_OUT,
} from '../actions/actionTypes';

const _defaultState = { details: {} };

const accordionReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case ACCORDION_OPEN: {
      const { accordionType, accordionItem } = action;
      nextState = { ...state };
      nextState[accordionType] = { ...state[accordionItem] };
      nextState[accordionType][accordionItem] = true;
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

export default accordionReducer;
