import merge from 'lodash.merge';
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
} from '../actions/actionTypes';
import parseDateToMilliseconds from '../util/dateUtil';

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
        };
      });

      reads.forEach((read) => {
        if (read.readableType !== 'Message') return;
        nextState[read.slug] = Object.assign({}, nextState[read.slug]);
        nextState[read.slug].id = read.readableId;
        nextState[read.slug].slug = read.slug;
        nextState[read.slug].readId = read.id;
        nextState[read.slug].lastRead = read.accessedAt;
      });

      Object.values(nextState).forEach((message) => {
        const lastActive = parseDateToMilliseconds(message.lastActive);
        const lastRead = parseDateToMilliseconds(message.lastRead);
        nextState[message.slug] = {
          lastActive: message.lastActive || null,
          lastRead: message.lastRead || null,
          hasUnreads: lastActive > lastRead,
          reactionIds: [],
          thread: [],
          ...message,
        };
      });

      return merge({}, state, nextState);
    }
    case LOAD_CHAT_PAGE: {
      const { pagePath } = action;
      if (pagePath === 'threads') {
        return state;
      }

      nextState = Object.assign({}, state);
      const activeThreads = Object.values(nextState).filter(msg => msg.isActiveThread);
      activeThreads.forEach((message) => {
        nextState[message.slug].isActiveThread = false;
      });

      return nextState;
    }
    case MESSAGE.INDEX.RECEIVE: {
      const {
        messages,
        reactions,
        favorites,
        reads,
      } = action.messages;

      nextState = Object.assign({}, state);
      messages.forEach((message) => {
        const children = messages.filter(msg => msg.parentMessageSlug === message.slug);
        const thread = children.map(child => child.slug);

        nextState[message.slug] = {
          reactionIds: [],
          favoriteId: null,
          authors: [],
          thread,
          ...message,
        };
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

      reads.forEach((read) => {
        nextState[read.slug].readId = read.id;
      });

      return merge({}, state, nextState);
    }
    case MESSAGE.SHOW.REQUEST: {
      nextState = Object.assign({}, state);
      Object.values(nextState).forEach((prevMessage) => {
        nextState[prevMessage.slug].isOpen = false;
      });

      return nextState;
    }
    case MESSAGE.SHOW.RECEIVE: {
      const {
        message,
        childMessages,
        reactions,
        favorites,
        read,
      } = action.message;

      nextState = {};
      nextState[message.slug] = {
        reactionIds: [],
        readId: read && read.id,
        authors: [],
        isOpen: true,
        thread: [],
        ...message,
      };

      childMessages.forEach((child) => {
        nextState[child.slug] = {
          reactionIds: [],
          thread: null,
          ...child,
        };
      });

      reactions.forEach((reaction) => {
        nextState[reaction.messageSlug].reactionIds.push(reaction.id);
      });

      favorites.forEach((fav) => {
        nextState[fav.messageSlug].favoriteId = fav.id;
      });

      return merge({}, state, nextState);
    }
    case DRAWER_CLOSE: {
      nextState = Object.assign({}, state);
      Object.values(state).forEach((message) => {
        nextState[message.slug].isOpen = false;
      });

      return nextState;
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
    case USER_THREAD.INDEX.RECEIVE: {
      const { messageThreads: { messages, reactions, favorites } } = action;
      nextState = {};
      const parents = messages.filter(msg => !msg.parentMessageId);
      const children = messages.filter(msg => msg.parentMessageId);

      parents.forEach((parent) => {
        nextState[parent.slug] = {
          thread: [],
          reactionIds: [],
          isActiveThread: true,
          hasUnreads: false,
          ...parent,
        };
      });

      children.forEach((child) => {
        nextState[child.slug] = {
          reactionIds: [],
          ...child,
        };

        nextState[child.parentMessageSlug].thread.push(child.slug);
      });

      reactions.forEach((reaction) => {
        nextState[reaction.messageSlug].reactionIds.push(reaction.id);
      });

      favorites.forEach((favorite) => {
        nextState[favorite.messageSlug].favoriteId = favorite.id;
      });

      return merge({}, state, nextState);
    }
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

      const lastRead = parseDateToMilliseconds(read.accessedAt);
      const lastActive = parseDateToMilliseconds(nextState[read.slug].lastActive);
      nextState[read.slug].hasUnreads = lastActive > lastRead;

      if (nextState[read.slug].isOpen || nextState[read.slug].isActiveThread) {
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

      const lastRead = parseDateToMilliseconds(nextState[unread.slug].lastRead);
      const lastActive = parseDateToMilliseconds(unread.activeAt);
      nextState[unread.slug].hasUnreads = lastActive > lastRead;

      if (nextState[unread.slug].isOpen || nextState[unread.slug].isActiveThread) {
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
