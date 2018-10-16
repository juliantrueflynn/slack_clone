import {
  PASSWORD,
  LOAD_CHAT_PAGE,
  WORKSPACE,
  SIGN_OUT,
  USER,
  MODAL_CLOSE,
  MODAL_OPEN,
  DESTROY_SUCCESS,
} from '../actions/actionTypes';

const _defaultState = {
  password: null,
  user: null,
};

const successReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
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
    case LOAD_CHAT_PAGE:
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
