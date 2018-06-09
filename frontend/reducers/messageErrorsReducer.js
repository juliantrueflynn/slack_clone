import {
  CREATE_MESSAGE,
  UPDATE_MESSAGE,
  DELETE_MESSAGE,
} from '../actions/actionTypes';

const messageErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case CREATE_MESSAGE.FAILURE:
    case UPDATE_MESSAGE.FAILURE:
    case DELETE_MESSAGE.FAILURE:
      return [...action.errors];
    case CREATE_MESSAGE.REQUEST:
    case UPDATE_MESSAGE.REQUEST:
    case DELETE_MESSAGE.REQUEST:
      return [];
    default:
      return state;
  }
};

export default messageErrorsReducer;
