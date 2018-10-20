import {
  PASSWORD,
  WORKSPACE,
  SIGN_OUT,
  USER,
  MODAL_CLOSE,
  MODAL_OPEN,
  DESTROY_SUCCESS,
  CHANNEL,
} from '../actions/actionTypes';

const _defaultState = {
  password: null,
  channel: null,
  user: null,
};

const successReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case CHANNEL.UPDATE.RECEIVE: {
      nextState = Object.assign({}, state);
      nextState.channel = 'Channel successfully updated.';
      return nextState;
    }
    case PASSWORD.UPDATE.RECEIVE: {
      const { success } = action;
      nextState = Object.assign({}, state);
      nextState.password = success;
      return nextState;
    }
    case PASSWORD.UPDATE.REQUEST:
    case DESTROY_SUCCESS: {
      const { entity } = action;

      if (!entity) {
        return state;
      }

      nextState = Object.assign({}, state);
      nextState[entity] = null;
      return nextState;
    }
    case WORKSPACE.SHOW.REQUEST:
    case USER.SHOW.REQUEST:
    case MODAL_OPEN:
    case MODAL_CLOSE:
    case SIGN_OUT:
      return _defaultState;
    default:
      return state;
  }
};

export default successReducer;
