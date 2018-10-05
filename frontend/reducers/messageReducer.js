import merge from 'lodash.merge';
import { isDateOlderThanOther } from '../util/dateUtil';
import {
  MESSAGE,
  USER_THREAD,
  REACTION,
  READ,
  FAVORITE,
  WORKSPACE,
  SIGN_OUT,
  CLEAR_UNREADS,
  UNREAD,
  DRAWER_CLOSE,
  LOAD_CHAT_PAGE,
  HISTORY,
} from '../actions/actionTypes';

const messageReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACE.SHOW.RECEIVE: {
      const { workspace: { unreads, reads } } = action;

      nextState = {};
      unreads.forEach((unread) => {
        if (unread.unreadableType !== 'Message') return;
        nextState[unread.slug] = {
          id: unread.unreadableId,
          slug: unread.slug,
          unreadId: unread.id,
          lastActive: unread.activeAt,
          authorSlug: unread.authorSlug,
          channelSlug: unread.channelSlug,
        };
      });

      reads.forEach((read) => {
        if (read.readableType !== 'Message') return;
        nextState[read.slug] = Object.assign({}, nextState[read.slug]);
        nextState[read.slug].id = read.readableId;
        nextState[read.slug].slug = read.slug;
        nextState[read.slug].readId = read.id;
        nextState[read.slug].lastRead = read.accessedAt;
        nextState[read.slug].authorSlug = read.authorSlug;
        nextState[read.slug].channelSlug = read.channelSlug;
      });

      Object.values(nextState).forEach((message) => {
        const { lastActive, lastRead } = message;
        nextState[message.slug] = {
          lastActive: message.lastActive || null,
          lastRead: message.lastRead || null,
          hasUnreads: isDateOlderThanOther(lastRead, lastActive),
          isInConvo: true,
          reactionIds: [],
          thread: [],
          ...message,
        };
      });

      return merge({}, state, nextState);
    }
    case LOAD_CHAT_PAGE: {
      const { pagePath } = action;
      const convos = Object.values(state).filter(message => message.isInConvo);

      nextState = {};
      convos.forEach((message) => {
        nextState[message.slug] = { isActiveConvo: pagePath === 'threads' };
      });

      return merge({}, state, nextState);
    }
    case USER_THREAD.INDEX.RECEIVE:
    case MESSAGE.SHOW.RECEIVE:
    case HISTORY.INDEX.RECEIVE:
    case MESSAGE.INDEX.RECEIVE: {
      const {
        messages,
        reactions,
        favorites,
        channel,
      } = action.messages;

      nextState = Object.assign({}, state);
      messages.forEach((message) => {
        const children = messages.filter(msg => msg.parentMessageId === message.id);
        const thread = children.map(child => child.slug);

        nextState[message.slug] = {
          reactionIds: [],
          authors: [],
          thread,
          ...message,
        };

        if (channel) {
          nextState[message.slug].channelSlug = channel.slug;
        }

        if (message.parentMessageId) {
          nextState[message.slug].thread = null;
        }
      });

      reactions.forEach(({ messageSlug, id }) => {
        if (nextState[messageSlug]) {
          const reactionIds = Object.assign([], nextState[messageSlug].reactionIds, [id]);
          nextState[messageSlug].reactionIds = reactionIds;
        }
      });

      favorites.forEach(({ id, messageSlug }) => {
        if (nextState[messageSlug]) nextState[messageSlug].favoriteId = id;
      });

      return merge({}, state, nextState);
    }
    case FAVORITE.INDEX.RECEIVE: {
      const { messages } = action.favorites;
      return merge({}, state, messages);
    }
    case DRAWER_CLOSE:
    case MESSAGE.SHOW.REQUEST: {
      const { messageSlug } = action;

      nextState = {};
      const parents = Object.values(state).filter(msg => !msg.parentMessageId);
      parents.forEach((prevMessage) => {
        nextState[prevMessage.slug] = { isOpen: false };
      });

      if (messageSlug) {
        nextState[messageSlug] = { isOpen: true };
      }

      return merge({}, state, nextState);
    }
    case MESSAGE.CREATE.REQUEST: {
      const { message } = action;

      if (!message.parentMessageId) {
        return state;
      }

      nextState = {};
      nextState[message.parentMessageSlug] = { isInConvo: true };

      return merge({}, state, nextState);
    }
    case MESSAGE.CREATE.RECEIVE: {
      const { message, authors } = action.message;
      nextState = Object.assign({}, state);
      nextState[message.slug] = {
        thread: message.parentMessageId ? null : [],
        reactionIds: [],
        ...message
      };

      if (message.parentMessageSlug) {
        if (!nextState[message.parentMessageSlug]) {
          nextState[message.parentMessageSlug] = {
            id: message.parentMessageId,
            slug: message.parentMessageSlug,
            thread: [],
            lastActive: message.createdAt,
            channelSlug: message.channelSlug,
          };
        }

        nextState[message.parentMessageSlug].authors = authors;
        nextState[message.parentMessageSlug].thread.push(message.slug);
      }

      return nextState;
    }
    case MESSAGE.UPDATE.RECEIVE: {
      const { message } = action;
      nextState = {};
      nextState[message.slug] = message;
      return merge({}, state, nextState);
    }
    case MESSAGE.DESTROY.RECEIVE:
      nextState = Object.assign({}, state);
      delete nextState[action.message.slug];
      return nextState;
    case REACTION.CREATE.RECEIVE: {
      const { reaction, messageSlug } = action;
      nextState = { [messageSlug]: { reactionIds: [reaction.id] } };
      return merge({}, state, nextState);
    }
    case READ.CREATE.RECEIVE:
    case READ.UPDATE.RECEIVE: {
      const { read } = action;
      if (read.readableType !== 'Message') return state;
      nextState = Object.assign({}, state);
      nextState[read.slug].readId = read.id;
      nextState[read.slug].lastRead = read.accessedAt;

      const lastRead = read.accessedAt;
      const { lastActive } = nextState[read.slug];
      nextState[read.slug].hasUnreads = isDateOlderThanOther(lastRead, lastActive);

      if (nextState[read.slug].isOpen || nextState[read.slug].isActiveConvo) {
        nextState[read.slug].hasUnreads = false;
      }

      return nextState;
    }
    case UNREAD.CREATE.RECEIVE:
    case UNREAD.UPDATE.RECEIVE: {
      const { unread } = action;
      if (unread.unreadableType !== 'Message') return state;
      nextState = Object.assign({}, state);
      nextState[unread.slug].unreadId = unread.id;
      nextState[unread.slug].lastActive = unread.activeAt;

      const { lastRead } = nextState[unread.slug];
      const lastActive = unread.activeAt;
      nextState[unread.slug].hasUnreads = isDateOlderThanOther(lastRead, lastActive);

      if (nextState[unread.slug].isOpen || nextState[unread.slug].isActiveConvo) {
        nextState[unread.slug].hasUnreads = false;
      }

      return nextState;
    }
    case FAVORITE.CREATE.RECEIVE: {
      const { id, messageSlug } = action.favorite;
      nextState = Object.assign({}, state);
      nextState[messageSlug].favoriteId = id;
      return nextState;
    }
    case FAVORITE.DESTROY.RECEIVE: {
      const { messageSlug } = action.favorite;
      nextState = Object.assign({}, state);
      nextState[messageSlug].favoriteId = null;
      return nextState;
    }
    case READ.INDEX.RECEIVE: {
      const { unreads } = action;

      nextState = unreads.reduce((acc, curr) => {
        acc[curr.slug] = curr;
        acc[curr.slug].isUnread = true;
        return acc;
      }, {});

      return merge({}, state, nextState);
    }
    case CLEAR_UNREADS: {
      const { channelSlug } = action;
      nextState = Object.assign({}, state);
      const unreads = Object.values(nextState).filter(msg => msg.channelSlug === channelSlug);
      unreads.forEach((message) => { nextState[message.slug].isUnread = false; });
      return nextState;
    }
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default messageReducer;
