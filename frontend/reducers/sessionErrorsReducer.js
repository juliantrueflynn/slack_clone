import {
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST
} from '../actions/sessionActions';

const _nullErrors = [];

const sessionErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case SIGN_IN_FAILURE :
    case SIGN_UP_FAILURE :
      return [...action.errors];
    case SIGN_IN_REQUEST :
    case SIGN_UP_REQUEST :
      return _nullErrors;
    default :
      return state;
  }
};

export default sessionErrorsReducer;