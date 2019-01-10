import merge from 'lodash.merge';
import { isDateOlderThanOther } from '../util/dateUtil';
import {
  CREATE_UNREAD,
  WORKSPACE,
  READ,
  CLEAR_UNREADS,
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
      const { channels, reads } = action.workspace;

      nextState = {};
      channels.forEach((ch) => {
        nextState[ch.slug] = { lastActive: ch.lastActive, readableType: 'Channel' };
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
      const { channelSlug, createdAt, parentMessageSlug: parentSlug } = action.message;

      nextState = {};
      if (parentSlug && state[parentSlug] && state[parentSlug].readableType === 'Message') {
        nextState[channelSlug] = { lastActive: createdAt };
      }

      if (!parentSlug) {
        nextState[channelSlug] = { lastActive: createdAt };
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
    case CREATE_UNREAD: {
      const { unread } = action;

      nextState = {};
      nextState[unread.slug] = unread;

      return merge({}, state, nextState);
    }
    case CLEAR_UNREADS: {
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
