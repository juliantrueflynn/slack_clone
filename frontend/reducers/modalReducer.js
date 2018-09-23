import {
  MODAL_OPEN,
  MODAL_CLOSE,
  REACTION,
  MESSAGE,
  WORKSPACE,
} from '../actions/actionTypes';

const _nullState = {
  modalType: null,
  modalProps: null,
};

const modalReducer = (state = _nullState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case MODAL_OPEN: {
      const { modalType, modalProps } = action;
      return { modalType, modalProps };
    }
    case REACTION.CREATE.RECEIVE:
    case MESSAGE.INDEX.RECEIVE:
    case WORKSPACE.SHOW.REQUEST:
    case MODAL_CLOSE:
      return _nullState;
    default:
      return state;
  }
};

export default modalReducer;
