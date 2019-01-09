import {
  DROPDOWN_UPDATE,
  WORKSPACE,
  USER_THREAD,
  READ,
  SIGN_OUT,
  MESSAGE,
  USER,
  PIN,
  MODAL_UPDATE,
  MESSAGE_EDITOR_TOGGLE,
  WORKSPACE_SUB,
} from '../actions/actionTypes';

const _defaultState = {
  dropdownType: null,
  dropdownProps: {}
};

const dropdownReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case DROPDOWN_UPDATE: {
      const { dropdownType, dropdownProps } = action;

      if (!dropdownType) {
        return _defaultState;
      }

      return { dropdownType, dropdownProps };
    }
    case MESSAGE.INDEX.REQUEST:
    case USER_THREAD.INDEX.REQUEST:
    case READ.INDEX.REQUEST:
    case USER.SHOW.REQUEST:
    case MESSAGE_EDITOR_TOGGLE:
    case MESSAGE.DESTROY.RECEIVE:
    case PIN.CREATE.REQUEST:
    case PIN.DESTROY.REQUEST:
    case WORKSPACE_SUB.CREATE.REQUEST:
    case WORKSPACE.SHOW.REQUEST:
    case MODAL_UPDATE:
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    default:
      return state;
  }
};

export default dropdownReducer;
