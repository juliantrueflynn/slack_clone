import merge from 'lodash.merge';
import { isDateOlderThanOther } from '../util/dateUtil';
import {
  UNREAD_UPDATE,
  WORKSPACE,
  READ,
  UNREAD_CLEAR_ALL,
  MESSAGE,
  WORKSPACE_SUB,
  SIGN_OUT,
} from '../actions/actionTypes';

const _defaultState = {};

const unreadReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  let nextState;

  switch (action.type) {
    case WORKSPACE.SHOW.RECEIVE: {
      const { chatrooms, reads } = action.workspace;

      nextState = {};
      chatrooms.forEach((ch) => {
        nextState[ch.slug] = { lastActive: ch.lastActive, readableType: 'Chatroom' };
      });

      reads.forEach((read) => {
        nextState[read.slug] = { ...nextState[read.slug], ...read };
      });

      Object.values(nextState).forEach((unread) => {
        nextState[unread.slug] = {
          ...nextState[unread.slug],
          hasUnreads: isDateOlderThanOther(unread.lastRead, unread.lastActive),
        };
      });

      return nextState;
    }
    case MESSAGE.CREATE.RECEIVE: {
      const { chatroomSlug, createdAt, parentMessageSlug: parentSlug } = action.message;

      nextState = {};
      if (parentSlug && state[parentSlug] && state[parentSlug].readableType === 'Message') {
        nextState[chatroomSlug] = { lastActive: createdAt };
      }

      if (!parentSlug) {
        nextState[chatroomSlug] = { lastActive: createdAt };
      }

      return merge({}, state, nextState);
    }
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
    case UNREAD_UPDATE: {
      const { unread } = action;

      nextState = {};
      nextState[unread.slug] = unread;

      return merge({}, state, nextState);
    }
    case UNREAD_CLEAR_ALL: {
      const { chatPath, lastRead } = action;

      nextState = {};

      if (chatPath === 'threads') {
        nextState = Object.values(state).filter(unread => (
          unread.readableType === 'Message' && unread.hasUnreads
        )).reduce((acc, curr) => ({
          ...acc,
          [curr.slug]: { hasUnreads: false, lastRead: curr.lastActive }
        }), {});
      } else {
        nextState[chatPath] = { hasUnreads: false, lastActive: lastRead };
      }

      return merge({}, state, nextState);
    }
    case WORKSPACE_SUB.CREATE.REQUEST:
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return _defaultState;
    default:
      return state;
  }
};

export default unreadReducer;
