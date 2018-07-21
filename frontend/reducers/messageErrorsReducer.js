import { MESSAGE } from '../actions/actionTypes';

const messageErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case MESSAGE.CREATE.FAILURE:
    case MESSAGE.UPDATE.FAILURE:
    case MESSAGE.DESTROY.FAILURE:
      return [...action.errors];
    case MESSAGE.CREATE.REQUEST:
    case MESSAGE.UPDATE.REQUEST:
    case MESSAGE.DESTROY.REQUEST:
      return [];
    default:
      return state;
  }
};

export default messageErrorsReducer;
