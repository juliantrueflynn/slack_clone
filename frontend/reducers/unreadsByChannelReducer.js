import merge from 'lodash.merge';
import { READ, CREATE_UNREAD, CLEAR_UNREADS } from '../actions/actionTypes';

const unreadsByChannelReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState;

  switch (action.type) {
    case READ.INDEX.RECEIVE: {
      const { messages } = action.messages;

      nextState = messages.reduce((acc, curr) => {
        acc[curr.channelSlug] = [];
        return acc;
      }, {});

      return messages.reduce((acc, curr) => {
        acc[curr.channelSlug].push(curr.slug);
        return acc;
      }, nextState);
    }
    case CREATE_UNREAD: {
      const { unreadType: readableType, entityProps, messageSlug } = action;

      if (readableType !== 'Channel') {
        return state;
      }

      nextState = merge({}, state);
      nextState[entityProps.slug].push(messageSlug);

      return merge({}, state, nextState);
    }
    case CLEAR_UNREADS:
      nextState = merge({}, state, nextState);
      nextState[action.channelSlug] = [];
      return nextState;
    default:
      return state;
  }
};

export default unreadsByChannelReducer;
