import { MESSAGE } from '../actions/actionTypes';

const messageDisplayReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case MESSAGE.SHOW.REQUEST:
      return action.messageSlug;
    default:
      return state;
  }
};

export default messageDisplayReducer;
