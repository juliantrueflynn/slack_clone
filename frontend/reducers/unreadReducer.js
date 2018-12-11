import merge from 'lodash.merge';
import { isDateOlderThanOther } from '../util/dateUtil';
import {
  CREATE_UNREAD,
  WORKSPACE,
  READ,
  USER_THREAD,
  CLEAR_UNREADS,
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
          slug: msg.parentMessageSlug,
          lastActive: msg.createdAt,
          readableId: msg.parentMessageId,
          readableType: 'Message',
        };
      });

      messages.filter(msg => !msg.parentMessageId).forEach((msg) => {
        nextState[msg.channelSlug] = {
          slug: msg.channelSlug,
          lastActive: msg.createdAt,
          readableId: msg.channelId,
          readableType: 'Channel',
        };
      });

      reads.forEach((read) => {
        nextState[read.slug] = {
          ...nextState[read.slug],
          slug: read.slug,
          readableId: read.readableId,
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
    case READ.CREATE.RECEIVE:
    case READ.UPDATE.RECEIVE: {
      const { read } = action;

      nextState = {};
      nextState[read.slug] = {
        slug: read.slug,
        lastRead: read.accessedAt,
        readableType: read.readableType,
        readableId: read.readableId,
        hasUnreads: false,
      };

      return merge({}, state, nextState);
    }
    case READ.DESTROY.RECEIVE:
      nextState = merge({}, state);
      delete nextState[action.read.slug];
      return nextState;
    case CREATE_UNREAD: {
      const { unreadType: readableType, entityProps } = action;
      nextState = {};
      nextState[entityProps.slug] = {
        readableType,
        hasUnreads: isDateOlderThanOther(entityProps.lastRead, entityProps.lastActive),
        ...entityProps
      };

      return merge({}, state, nextState);
    }
    case CLEAR_UNREADS:
      nextState = {};
      nextState[action.channelSlug] = { hasUnreads: false, lastActive: action.lastRead };
      return merge({}, state, nextState);
    default:
      return state;
  }
};

export default unreadReducer;
