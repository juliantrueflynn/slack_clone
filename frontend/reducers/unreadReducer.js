import merge from 'lodash.merge';
import { isDateOlderThanOther } from '../util/dateUtil';
import {
  CREATE_UNREAD,
  WORKSPACE,
  READ,
  USER_THREAD,
  MESSAGE,
} from '../actions/actionTypes';

const unreadReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState;

  switch (action.type) {
    case WORKSPACE.SHOW.RECEIVE: {
      const { messages, reads } = action.workspace;

      nextState = {};
      messages.filter(msg => msg.parentMessageId).forEach((msg) => {
        nextState[msg.parentMessageSlug] = {
          lastActive: msg.createdAt,
          readableType: 'Message',
        };
      });

      messages.filter(msg => !msg.parentMessageId).forEach((msg) => {
        nextState[msg.channelSlug] = {
          lastActive: msg.createdAt,
          readableType: 'Channel',
        };
      });

      reads.forEach((read) => {
        nextState[read.slug] = {
          ...nextState[read.slug],
          slug: read.slug,
          readableType: read.readableType,
          lastRead: read.accessedAt,
        };
      });

      Object.values(nextState).forEach((unread) => {
        nextState[unread.slug] = {
          ...nextState[unread.slug],
          hasUnreads: isDateOlderThanOther(unread.lastRead, unread.lastActive),
        };
      });

      return nextState;
    }
    case USER_THREAD.INDEX.RECEIVE: {
      const { messages } = action.messages;

      nextState = messages.reduce((acc, curr) => {
        acc[curr.slug] = { hasUnreads: false };
        return acc;
      });

      return merge({}, state, nextState);
    }
    case MESSAGE.CREATE.RECEIVE: {
      const { createdAt: lastActive, parentMessageSlug } = action.message;

      if (!parentMessageSlug) {
        return state;
      }

      nextState = {};
      nextState[parentMessageSlug] = { lastActive };

      return merge({}, state, nextState);
    }
    case READ.CREATE.RECEIVE:
    case READ.UPDATE.RECEIVE: {
      const { read } = action;

      if (read.readableType !== 'Message') {
        return state;
      }

      nextState = {};
      nextState[read.slug] = { lastRead: read.accessedAt, hasUnreads: false };

      return merge({}, state, nextState);
    }
    case READ.DESTROY.RECEIVE:
      nextState = merge({}, state);
      delete nextState[action.read.slug];
      return nextState;
    case CREATE_UNREAD: {
      const { unreadType: readableType, entityProps } = action;
      nextState = {};
      nextState[entityProps.slug] = { readableType, ...entityProps };

      return merge({}, state, nextState);
    }
    default:
      return state;
  }
};

export default unreadReducer;
