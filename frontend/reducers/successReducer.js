import {
  FORM_SUCCESS_UPDATE,
  CHANNEL,
  USER,
  PASSWORD,
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
    case FORM_SUCCESS_UPDATE: {
      const { entity, message } = action;
      nextState = { ...state };
      nextState[entity] = message;

      return nextState;
    }
    case MODAL_UPDATE:
    case USER.UPDATE.REQUEST:
    case PASSWORD.UPDATE.REQUEST:
    case CHANNEL.CREATE.REQUEST:
    case CHANNEL.UPDATE.REQUEST:
      return _defaultState;
    default:
      return state;
  }
};

export default successReducer;
