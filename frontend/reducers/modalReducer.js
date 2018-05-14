import { MODAL_OPEN, MODAL_CLOSE } from '../actions/modalActions';

const modalReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case MODAL_OPEN :
      return action.modalType;
    case MODAL_CLOSE :
      return null;
    default :
      return state;
  }
};

export default modalReducer;