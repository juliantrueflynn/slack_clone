import {
  MODAL_UPDATE,
  MESSAGE,
  WORKSPACE,
  SIGN_OUT,
  READ,
  USER_THREAD,
} from '../actions/actionTypes';

const _defaultState = {
  modalType: null,
  modalProps: null,
};

const modalReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case MODAL_UPDATE: {
      const { modalType, modalProps } = action;

      if (!modalType) {
        return _defaultState;
      }

      return { modalType, modalProps };
    }
    case SIGN_OUT.RECEIVE:
    case MESSAGE.INDEX.REQUEST:
    case WORKSPACE.SHOW.REQUEST:
    case USER_THREAD.INDEX.REQUEST:
    case READ.INDEX.REQUEST:
      return _defaultState;
    default:
      return state;
  }
};

export default modalReducer;
