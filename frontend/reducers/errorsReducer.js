import {
  CHANNEL,
  MESSAGE,
  MODAL_CLOSE,
  SIGN_OUT,
  SIGN_IN,
  SIGN_UP,
  WORKSPACE,
  PASSWORD,
} from '../actions/actionTypes';

const _defaultState = {
  workspace: [],
  channel: [],
  session: [],
  password: [],
  user: [],
  message: [],
};

const errorsReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  const nextState = Object.assign({}, state);

  switch (action.type) {
    case WORKSPACE.CREATE.FAILURE:
      nextState.workspace = [...action.errors];
      return nextState;
    case MESSAGE.CREATE.FAILURE:
    case MESSAGE.UPDATE.FAILURE:
      nextState.message = [...action.errors];
      return nextState;
    case SIGN_IN.FAILURE:
    case SIGN_UP.FAILURE:
      nextState.session = [...action.errors];
      return nextState;
    case CHANNEL.CREATE.FAILURE:
    case CHANNEL.UPDATE.FAILURE:
      nextState.channel = [...action.errors];
      return nextState;
    case PASSWORD.UPDATE.FAILURE:
      nextState.password = [...action.errors];
      return nextState;
    case WORKSPACE.SHOW.REQUEST:
    case WORKSPACE.CREATE.REQUEST:
    case MESSAGE.CREATE.REQUEST:
    case MESSAGE.UPDATE.REQUEST:
    case SIGN_IN.REQUEST:
    case SIGN_UP.REQUEST:
    case SIGN_OUT.RECEIVE:
    case CHANNEL.CREATE.REQUEST:
    case CHANNEL.UPDATE.REQUEST:
    case PASSWORD.UPDATE.REQUEST:
    case MODAL_CLOSE:
      return _defaultState;
    default:
      return state;
  }
};

export default errorsReducer;
