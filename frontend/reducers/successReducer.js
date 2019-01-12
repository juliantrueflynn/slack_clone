import {
  FORM_SUCCESS_UPDATE,
  CHATROOM,
  USER,
  PASSWORD,
  MODAL_UPDATE,
  WORKSPACE_SUB,
  SIGN_OUT,
} from '../actions/actionTypes';

const _defaultState = null;

const successReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case FORM_SUCCESS_UPDATE:
      nextState = action.message;
      return nextState;
    case MODAL_UPDATE:
    case USER.UPDATE.REQUEST:
    case PASSWORD.UPDATE.REQUEST:
    case CHATROOM.CREATE.REQUEST:
    case CHATROOM.UPDATE.REQUEST:
    case WORKSPACE_SUB.CREATE.REQUEST:
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    default:
      return state;
  }
};

export default successReducer;
