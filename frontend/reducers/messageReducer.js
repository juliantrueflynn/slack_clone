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
      const { channel, messageSlug } = action;
      
      channel.messages.map(message => {
        nextState[message.slug] = message;
        nextState[message.slug].thread = nextState[message.slug].thread || [];

        if (message.parentMessageSlug) {
          nextState[message.slug].thread = null;

          nextState.every(oldMessage => {
            if (message.parentMessageId === nextState[oldMessage.slug].id) {
              nextState[oldMessage.slug] = Object.assign(
                [ message.slug ],
                nextState[oldMessage.slug].thread
              );
              
              return false;
            }
          });
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
      nextState = Object.assign({}, state);
      nextState[message.slug] = message;

      if (parentMessageSlug) {
        nextState[parentMessageSlug].thread.push(message.slug);
      } else {
        nextState[message.slug].thread = [];
      }
      
      return nextState;
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
        Object.values(state).map(({ slug, parentMessageId }) => {
          if (parentMessageId === sidebarProps.messageSlug) {
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