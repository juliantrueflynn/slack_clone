import {
  CHANNEL,
  MESSAGE,
  MODAL_UPDATE,
  SIGN_IN,
  SIGN_UP,
  WORKSPACE,
  PASSWORD,
  USER,
  FORM_ERRORS_DESTROY,
  WORKSPACE_SUB,
} from '../actions/actionTypes';

const _defaultState = [];

const errorsReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case WORKSPACE.CREATE.FAILURE:
    case MESSAGE.CREATE.FAILURE:
    case MESSAGE.UPDATE.FAILURE:
    case SIGN_IN.FAILURE:
    case SIGN_UP.FAILURE:
    case USER.UPDATE.FAILURE:
    case PASSWORD.UPDATE.FAILURE:
    case CHANNEL.CREATE.FAILURE:
    case CHANNEL.UPDATE.FAILURE:
      return [...action.errors];
    case WORKSPACE_SUB.CREATE.REQUEST:
    case FORM_ERRORS_DESTROY:
    case MODAL_UPDATE:
      return _defaultState;
    default:
      return state;
  }
};

export default errorsReducer;
