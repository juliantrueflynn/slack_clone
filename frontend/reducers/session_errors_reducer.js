import {
  RECEIVE_SESSION_ERROR,
  RECEIVE_CURRENT_USER
} from '../actions/session_actions';

const _nullErrors = [];

const sessionErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SESSION_ERROR :
      return action.errors;
    case RECEIVE_CURRENT_USER :
      return _nullErrors;
    default :
      return state;
  }
};

export default sessionErrorsReducer;