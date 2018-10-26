import {
  MODAL_OPEN,
  MODAL_CLOSE,
  REACTION,
  MESSAGE,
  WORKSPACE,
  SIGN_OUT,
} from '../actions/actionTypes';

const _defaultState = {
  modalType: null,
  modalProps: null,
};

const modalReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case MODAL_OPEN: {
      const { modalType, modalProps } = action;
      return { modalType, modalProps };
    }
    case SIGN_OUT.RECEIVE:
    case REACTION.CREATE.RECEIVE:
    case MESSAGE.INDEX.RECEIVE:
    case WORKSPACE.SHOW.REQUEST:
    case MODAL_CLOSE:
      return _defaultState;
    default:
      return state;
  }
};

export default modalReducer;
