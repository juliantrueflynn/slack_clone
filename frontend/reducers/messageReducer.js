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
  RIGHT_SIDEBAR_CLOSE,
} from '../actions/actionTypes';
import parseDateToMilliseconds from '../util/dateUtil';

const messageReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACE.SHOW.RECEIVE: {
      const { workspace: { unreads, reads } } = action;
      nextState = Object.assign({}, state);

      unreads.forEach((unread) => {
        if (unread.unreadableType === 'Channel') return;
        if (!nextState[unread.slug]) nextState[unread.slug] = {};
        nextState[unread.slug].id = unread.unreadableId;
        nextState[unread.slug].slug = unread.slug;
        nextState[unread.slug].lastActive = unread.activeAt;
        nextState[unread.slug].lastRead = null;
        nextState[unread.slug].hasUnreads = false;
        nextState[unread.slug].unreadId = unread.id;
        nextState[unread.slug].thread = [];
      });

      reads.forEach((read) => {
        if (read.readableType === 'Channel') return;
        if (!nextState[read.slug]) {
          nextState[read.slug] = {
            lastActive: null,
            lastRead: read.accessedAt,
            hasUnreads: false,
          };
        } else {
          const lastActive = parseDateToMilliseconds(nextState[read.slug].lastActive);
          const lastRead = parseDateToMilliseconds(read.accessedAt);
          nextState[read.slug].lastRead = read.accessedAt;
          nextState[read.slug].hasUnreads = lastActive > lastRead;
        }

        nextState[read.slug].id = read.readableId;
        nextState[read.slug].slug = read.slug;
        nextState[read.slug].readId = read.id;
        nextState[read.slug].thread = [];
      });

      return nextState;
    }
    case MESSAGE.INDEX.RECEIVE: {
      nextState = Object.assign({}, state);
      const {
        messages,
        reactions,
        favorites,
        reads,
      } = action.messages;

      messages.forEach((message) => {
        const children = messages.filter(msg => msg.parentMessageSlug === message.slug);
        const thread = children.map(child => child.slug);
        const lastThreadMsg = children[thread.length - 1];
        const lastReadInMs = parseDateToMilliseconds(message.lastRead);
        const lastActiveInMs = lastThreadMsg && parseDateToMilliseconds(lastThreadMsg.createdAt);

        nextState[message.slug] = {
          reactionIds: [],
          favoriteId: null,
          readId: null,
          lastActive: lastThreadMsg && lastThreadMsg.createdAt,
          hasUnreads: lastReadInMs < lastActiveInMs,
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
    case MESSAGE.SHOW.RECEIVE: {
      const {
        message,
        childMessages,
        reactions,
        favorites,
        read,
      } = action.message;

      nextState = Object.assign({}, state);

      Object.values(nextState).forEach((prevMessage) => {
        nextState[prevMessage.slug] = { isActive: false };
      });

      nextState[message.slug] = {
        reactionIds: [],
        readId: read && read.id,
        isActive: true,
        thread: [],
        ...message,
      };

      childMessages.forEach((child) => {
        nextState[child.slug] = {
          reactionIds: [],
          favoriteId: null,
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

      return nextState;
    }
    case RIGHT_SIDEBAR_CLOSE: {
      nextState = {};
      Object.values(state).forEach((message) => {
        nextState[message.slug] = { isActive: false };
      });

      return merge({}, nextState);
    }
    case MESSAGE.CREATE.RECEIVE: {
      const { message } = action.message;
      const { parentMessageSlug, slug } = message;
      message.thread = parentMessageSlug ? null : [];
      message.lastRead = null;
      message.readId = null;
      message.reactionIds = [];
      message.favoriteId = null;
      nextState = merge({}, state, { [slug]: message });
      if (parentMessageSlug) {
        if (!nextState[parentMessageSlug]) {
          nextState[parentMessageSlug] = {
            id: message.parentMessageId,
            slug: parentMessageSlug,
            thread: [],
            favoriteId: [],
            reactionIds: [],
            lastActive: message.createdAt,
            channelId: message.channelId,
            channelSlug: message.channelSlug,
            parentMessageId: null,
          };
        }

        nextState[parentMessageSlug].thread.push(slug);
      }
      return nextState;
    }
    case MESSAGE.UPDATE.RECEIVE: {
      const { message } = action;
      return merge({}, state, { [message.slug]: message });
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
          favoriteId: null,
          isActiveThread: true,
          hasUnreads: false,
          ...parent,
        };
      });

      children.forEach((child) => {
        nextState[child.slug] = {
          favoriteId: null,
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

      if (nextState[read.slug].isActive) {
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

      if (nextState[unread.slug].isActive) {
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
      unreads.forEach((message) => {
        nextState[message.slug].isUnread = false;
      });

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
