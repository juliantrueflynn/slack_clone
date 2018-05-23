import merge from 'lodash.merge';
import {
  CREATE_MESSAGE_RECEIVE,
  UPDATE_MESSAGE_RECEIVE,
  DELETE_MESSAGE_RECEIVE,
  MESSAGE_RECEIVE
} from '../actions/messageActions';
import { CHANNEL_RECEIVE } from '../actions/channelActions';
import { OPEN_RIGHT_SIDEBAR } from '../actions/rightSidebarActions';

const messageReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case CHANNEL_RECEIVE : {
      nextState = Object.assign({}, state);
      const { channel: { messages }, ui: { messageSlug } } = action;
      
      messages.map(message => {
        nextState[message.slug] = message;
        nextState[message.slug].thread = nextState[message.slug].thread || [];

        if (messageSlug) {
          const { parentMessageSlug, parentMessageId, slug } = message;
          nextState[slug].thread = null;
          
          if (nextState[messageSlug] && parentMessageSlug === messageSlug) {
            nextState[messageSlug].thread = Object.assign(
              [ slug ],
              nextState[messageSlug].thread
            );
          }
        }
      });
  
      return nextState;
    }
    case MESSAGE_RECEIVE : {
      const { message: { message, thread, favorites } } = action;
      nextState = Object.assign({}, state);
      nextState[message.slug] = message;
      nextState[message.slug].thread = [];
      
      if (thread) {
        thread.map(entry => {
          nextState[entry.slug] = entry;
          nextState[message.slug].thread.push(entry.slug);
        });
      }

      return nextState;
    }
    case CREATE_MESSAGE_RECEIVE : {
      const { message, parentMessageSlug } = action;
      nextState = { [message.slug]: message };
      if (parentMessageSlug) {
        nextState[parentMessageSlug] = { thread: [ message.slug ] };
      }
      
      return merge({}, state, nextState);
    }
    case UPDATE_MESSAGE_RECEIVE :
      nextState = { [action.message.slug]: action.message };
      return Object.assign({}, state, nextState);
    case DELETE_MESSAGE_RECEIVE :
      nextState = Object.assign({}, state);
      delete nextState[action.messageSlug];
      return nextState;
    default :
      return state;
  }
};

export default messageReducer;