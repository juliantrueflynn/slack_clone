import { RECEIVE_CHANNEL } from '../actions/channel_actions';
import {
  CREATE_MESSAGE_SUCCESS, EDIT_MESSAGE_SUCCESS
} from '../actions/message_actions';

const messageReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case RECEIVE_CHANNEL :
      nextState = {};
      action.channel.messages.map(message => {
        nextState[message.id] = message;
      });
      return nextState;
    case CREATE_MESSAGE_SUCCESS :
      nextState = {};
      nextState[action.message.id] = action.message;
      return Object.assign({}, state, nextState);
    case EDIT_MESSAGE_SUCCESS :
      nextState = {};
      nextState[action.message.id] = action.message;
      return Object.assign({}, state, nextState);
    default :
      return state;
  }
};

export default messageReducer;