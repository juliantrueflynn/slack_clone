import merge from 'lodash.merge';
import {
  CREATE_MESSAGE_RECEIVE,
  UPDATE_MESSAGE_RECEIVE,
  DELETE_MESSAGE_RECEIVE
} from '../actions/messageActions';
import { CHANNEL_RECEIVE } from '../actions/channelActions';
import { OPEN_RIGHT_SIDEBAR } from '../actions/rightSidebarActions';

const messageReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case CHANNEL_RECEIVE : {
      nextState = Object.assign({}, state);
      const { channel: { messages }, messageSlug } = action;
      
      messages.map(message => {
        nextState[message.slug] = message;
        nextState[message.slug].thread = nextState[message.slug].thread || [];

        if (message.parentMessageSlug) {
          const { parentMessageSlug, parentMessageId, slug } = message;
          nextState[slug].thread = null;
          if (nextState[parentMessageSlug] && parentMessageId === nextState[parentMessageSlug].id) {
            nextState[parentMessageSlug].thread = Object.assign(
              [ slug ],
              nextState[parentMessageSlug].thread
            );
            
            return false;
          }
        }
      });

      if (messageSlug) {
        nextState[messageSlug] = Object.assign(
          {},
          state[messageSlug],
          nextState[messageSlug]
        );
        
        Object.values(state).map(message => {
          if (nextState[messageSlug].thread.includes(message.slug)) {
            nextState[message.slug] = message;
          }
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
    case OPEN_RIGHT_SIDEBAR : {
      const { sidebarProps, sidebarType } = action;
      
      if (sidebarType !== 'Thread') {
        nextState = Object.assign({}, state);
        Object.values(state).map(({ slug, parentMessageSlug }) => {
          if (parentMessageSlug === sidebarProps.messageSlug) {
            nextState[sidebarProps.messageSlug].thread.push(slug);
          }
        });
        return nextState; 
      }
  
      return state;
    }
    default :
      return state;
  }
};

export default messageReducer;