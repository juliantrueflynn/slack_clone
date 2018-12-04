import {
  CREATE_SUCCESS,
  PASSWORD,
  WORKSPACE,
  SIGN_OUT,
  USER,
  CHANNEL,
  MODAL_UPDATE,
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
    case USER.UPDATE.RECEIVE: {
      nextState = Object.assign({}, state);
      nextState.user = 'User successfully updated';
      return nextState;
    }
    case CREATE_SUCCESS: {
      const { entity, message } = action;

      nextState = Object.assign({}, state);
      nextState[entity] = message;
      return nextState;
    }
    case PASSWORD.UPDATE.REQUEST: {
      const { entity } = action;

      if (!entity) {
        return state;
      }

      nextState = Object.assign({}, state);
      nextState[entity] = null;
      return nextState;
    }
    case WORKSPACE.SHOW.REQUEST:
    case CHANNEL.UPDATE.REQUEST:
    case USER.UPDATE.REQUEST:
    case MODAL_UPDATE:
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    default:
      return state;
  }
};

export default successReducer;
