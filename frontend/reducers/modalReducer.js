import {
  MODAL_OPEN,
  MODAL_CLOSE,
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
    case MESSAGE.INDEX.REQUEST:
    case WORKSPACE.SHOW.REQUEST:
    case MODAL_CLOSE:
      return _defaultState;
    default:
      return state;
  }
};

export default modalReducer;
