import { RECEIVE_CHANNEL } from '../actions/channel_actions';
import {
  CREATE_MESSAGE_SUCCESS, EDIT_MESSAGE_SUCCESS, DELETE_MESSAGE_SUCCESS
} from '../actions/message_actions';
import { OPEN_THREAD } from '../actions/message_thread_actions';

const messageReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case RECEIVE_CHANNEL :
      const prevState = Object.assign({}, state);
      nextState = {};
      
      action.channel.messages.map(message => {
        nextState[message.id] = message;
      });

      if (action.threadId) {
        const threadedMessage = prevState[action.threadId];
        nextState[action.threadId] = threadedMessage;
        Object.values(prevState).map(message => {
          if (threadedMessage.threadIds.includes(message.id))
            nextState[message.id] = message;
        });
      }
      
      return nextState;
    case CREATE_MESSAGE_SUCCESS :
      nextState = {};
      nextState[action.message.id] = action.message;
      return Object.assign({}, state, nextState);
    case EDIT_MESSAGE_SUCCESS :
      nextState = {};
      nextState[action.message.id] = action.message;
      return Object.assign({}, state, nextState);
    case DELETE_MESSAGE_SUCCESS :
      nextState = Object.assign({}, state);
      delete nextState[action.messageId];
      return nextState;
    case OPEN_THREAD :
      nextState = Object.assign({}, state);
      const threadIds = [];
      Object.values(state).map(message => {
        if (message.parentMessageId === action.messageId) {
          threadIds.push(message.id);
        }
      });
      nextState[action.messageId].threadIds = threadIds;
      return nextState;
    default :
      return state;
  }
};

export default messageReducer;