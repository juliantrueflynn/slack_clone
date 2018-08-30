import {
  MODAL_OPEN,
  MODAL_CLOSE,
  CHANNEL,
  REACTION,
} from '../actions/actionTypes';

const modalReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case MODAL_OPEN:
      return action.modal;
    case REACTION.CREATE.RECEIVE:
    case CHANNEL.SHOW.RECEIVE:
    case MODAL_CLOSE:
      return null;
    default:
      return state;
  }
};

export default modalReducer;
