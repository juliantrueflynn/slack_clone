import {
  CHANNEL,
  MESSAGE,
  MODAL_UPDATE,
  SIGN_OUT,
  SIGN_IN,
  SIGN_UP,
  WORKSPACE,
  PASSWORD,
  USER,
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
    case WORKSPACE.SHOW.REQUEST:
    case WORKSPACE.CREATE.REQUEST:
    case MESSAGE.CREATE.REQUEST:
    case MESSAGE.UPDATE.REQUEST:
    case SIGN_IN.REQUEST:
    case SIGN_UP.REQUEST:
    case SIGN_OUT.RECEIVE:
    case USER.UPDATE.REQUEST:
    case PASSWORD.UPDATE.REQUEST:
    case CHANNEL.CREATE.REQUEST:
    case CHANNEL.UPDATE.REQUEST:
    case MODAL_UPDATE:
      return _defaultState;
    default:
      return state;
  }
};

export default errorsReducer;
