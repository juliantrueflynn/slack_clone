import { ACCORDION_OPEN, DRAWER_OPEN } from '../actions/actionTypes';

const accordionReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case ACCORDION_OPEN: {
      const { accordionType, accordionItem } = action;
      nextState = Object.assign({}, state);
      nextState[accordionType][accordionItem] = true;
      return nextState;
    }
    case DRAWER_OPEN: {
      const { drawer: { drawerType } } = action;

      if (drawerType !== 'details') {
        return state;
      }

      nextState = Object.assign({}, state);
      nextState.details = {};
      return nextState;
    }
    default:
      return state;
  }
};

export default accordionReducer;
