import { SIGN_IN, SIGN_UP } from '../actions/actionTypes';

const sessionErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case SIGN_IN.FAILURE:
    case SIGN_UP.FAILURE:
      return [...action.errors];
    case SIGN_IN.REQUEST:
    case SIGN_UP.REQUEST:
      return [];
    default:
      return state;
  }
};

export default sessionErrorsReducer;
