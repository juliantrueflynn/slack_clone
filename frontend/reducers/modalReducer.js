import {
  MODAL_OPEN,
  MODAL_CLOSE,
  REACTION,
  MESSAGE,
} from '../actions/actionTypes';

const modalReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case MODAL_OPEN:
      return action.modal;
    case REACTION.CREATE.RECEIVE:
    case MESSAGE.INDEX.RECEIVE:
    case MODAL_CLOSE:
      return null;
    default:
      return state;
  }
};

export default modalReducer;
