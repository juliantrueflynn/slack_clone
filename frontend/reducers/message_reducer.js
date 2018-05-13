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
      nextState = Object.assign({}, state);
      
      action.channel.messages.map(message => {
        nextState[message.slug] = message;
      });
      
      if (action.messageSlug) {
        const messageThread = nextState[action.messageSlug];
        nextState[action.messageSlug] = messageThread;
        Object.values(state).map(message => {
          if (messageThread.thread.includes(message.slug)) {
            nextState[message.slug] = message;
          }
        });
      }
  
      return nextState;
    case CREATE_MESSAGE_SUCCESS :
      const parentSlug = action.message.parentMessageSlug;
      nextState = Object.assign({}, state);
      nextState[action.message.slug] = action.message;
      
      if (parentSlug) {
        nextState[parentSlug].thread.push(action.message.slug);
      } else {
        action.message.thread = [];
      }
      
      return nextState;
    case EDIT_MESSAGE_SUCCESS :
      nextState = { [action.message.slug]: action.message };
      return Object.assign({}, state, nextState);
    case DELETE_MESSAGE_SUCCESS :
      nextState = Object.assign({}, state);
      delete nextState[action.messageSlug];
      return nextState;
    case OPEN_RIGHT_SIDEBAR :
      const { sidebarProps, sidebarType } = action;
      
      if (sidebarType !== 'THREAD') {
        nextState = Object.assign({}, state);
        Object.values(state).map(({ slug, parentMessageSlug }) => {
          if (parentMessageSlug === sidebarProps.messageSlug) {
            nextState[sidebarProps.messageSlug].thread.push(slug);
          }
        });
        return nextState; 
      }
  
      return state;
    default :
      return state;
  }
};

export default messageReducer;