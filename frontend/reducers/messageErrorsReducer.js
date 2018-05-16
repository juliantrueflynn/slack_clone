import {
  CREATE_MESSAGE_FAILURE,
  UPDATE_MESSAGE_FAILURE,
  DELETE_MESSAGE_FAILURE,
  CREATE_MESSAGE_REQUEST,
  UPDATE_MESSAGE_REQUEST,
  DELETE_MESSAGE_REQUEST
} from "../actions/messageActions";

const messageErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case CREATE_MESSAGE_FAILURE :
    case UPDATE_MESSAGE_FAILURE :
    case DELETE_MESSAGE_FAILURE :
      return [...action.errors];
    case CREATE_MESSAGE_REQUEST :
    case UPDATE_MESSAGE_REQUEST :
    case DELETE_MESSAGE_REQUEST :
      return [];
    default :
      return state;
  }
};

export default messageErrorsReducer;