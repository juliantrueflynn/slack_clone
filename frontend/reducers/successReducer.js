import {
  CREATE_SUCCESS,
  WORKSPACE,
  SIGN_OUT,
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
    case CREATE_SUCCESS: {
      const { entity, message } = action;
      nextState = { ...state };
      nextState[entity] = message;
      return nextState;
    }
    case WORKSPACE.SHOW.REQUEST:
    case CHANNEL.UPDATE.REQUEST:
    case MODAL_UPDATE:
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    default:
      return state;
  }
};

export default successReducer;
