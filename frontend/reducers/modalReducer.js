import {
  MODAL_UPDATE,
  WORKSPACE_SUB,
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
    case MODAL_UPDATE: {
      const { modalType, modalProps } = action;

      if (!modalType) {
        return _defaultState;
      }

      return { modalType, modalProps };
    }
    case WORKSPACE_SUB.CREATE.REQUEST:
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    default:
      return state;
  }
};

export default modalReducer;
