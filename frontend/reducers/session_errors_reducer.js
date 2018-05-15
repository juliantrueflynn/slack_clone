import {
  SESSION_FAILURE,
  SESSION_RECEIVE
} from '../actions/sessionActions';

const _nullErrors = [];

const sessionErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case SESSION_FAILURE :
      return [...action.errors];
    case SESSION_RECEIVE :
      return _nullErrors;
    default :
      return state;
  }
};

export default sessionErrorsReducer;