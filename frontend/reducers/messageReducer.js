import {
  CREATE_MESSAGE_SUCCESS,
  EDIT_MESSAGE_SUCCESS,
  DELETE_MESSAGE_SUCCESS
} from '../actions/messageActions';
import { CHANNEL_RECEIVE } from '../actions/channelActions';
import { OPEN_RIGHT_SIDEBAR } from '../actions/rightSidebarActions';

const messageReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case CHANNEL_RECEIVE :
      nextState = Object.assign({}, state);
      
      action.channel.messages.map(message => {
        nextState[message.slug] = message;
        nextState[message.slug].thread = nextState[message.slug].thread || [];

        if (message.parentMesasgeSlug) {
          const parentSlug = message.parentMessageSlug;
          nextState[message.slug].thread = null;
          nextState[parentSlug] = Object.assign(
            [message.slug],
            nextState[parentSlug].thread
          );
        }
      });
      
      if (action.messageSlug) {
        const parentSlug = action.messageSlug;
        nextState[parentSlug] = Object.assign(
          {},
          state[parentSlug],
          nextState[parentSlug]
        );
        Object.values(state).map(message => {
          if (nextState[parentSlug].thread.includes(message.slug)) {
            nextState[message.slug] = message;
          }
        });
      }
  
      return nextState;
    case CREATE_MESSAGE_SUCCESS :
      nextState = Object.assign({}, state);
      nextState[action.message.slug] = action.message;
      
      const parentSlug = action.message.parentMessageSlug;
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