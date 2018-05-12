import { RECEIVE_CHANNEL } from '../actions/channel_actions';
import {
  CREATE_MESSAGE_SUCCESS, EDIT_MESSAGE_SUCCESS, DELETE_MESSAGE_SUCCESS
} from '../actions/message_actions';
import { OPEN_RIGHT_SIDEBAR } from '../actions/right_sidebar_actions';

const messageReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case RECEIVE_CHANNEL :
      const prevState = Object.assign({}, state);
      nextState = {};
      
      action.channel.messages.map(message => {
        nextState[message.slug] = message;
        nextState[message.slug].thread = [];
      });

      if (action.messageSlug) {
        const threadedMessage = prevState[action.messageSlug];
        nextState[action.messageSlug] = threadedMessage;
        Object.values(prevState).map(message => {
          if (threadedMessage.threads.includes(message.slug))
            nextState[message.slug] = message;
        });
      }
      
      return nextState;
    case CREATE_MESSAGE_SUCCESS :
      nextState = Object.assign({}, state);
      action.message.threads = [];
      nextState[action.message.slug] = action.message;
      if (
        action.message.parentMessageId &&
        nextState[action.message.parentMessageId]
      ) {
        nextState[action.message.parentMessageId].threads
          .push(action.message.id);
      }
      return nextState;
    case EDIT_MESSAGE_SUCCESS :
      nextState = {};
      nextState[action.message.slug] = action.message;
      return Object.assign({}, state, nextState);
    case DELETE_MESSAGE_SUCCESS :
      nextState = Object.assign({}, state);
      delete nextState[action.messageSlug];
      return nextState;
    case OPEN_RIGHT_SIDEBAR :
      const { sidebarProps, sidebarType } = action;
      if (sidebarType !== 'THREAD') return state;
      nextState = Object.assign({}, state);

      Object.values(state).map(message =>
        message.parentMessageId === nextState[sidebarProps.messageSlug].id &&
          nextState[sidebarProps.messageSlug].threads.push(message.slug)
      );
      return nextState;
    default :
      return state;
  }
};

export default messageReducer;