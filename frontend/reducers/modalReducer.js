import { MODAL_OPEN, MODAL_CLOSE, CHANNEL } from '../actions/actionTypes';

const modalReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case MODAL_OPEN:
      return action.modalType;
    case CHANNEL.SHOW.RECEIVE:
    case MODAL_CLOSE:
      return null;
    default:
      return state;
  }
};

export default modalReducer;
