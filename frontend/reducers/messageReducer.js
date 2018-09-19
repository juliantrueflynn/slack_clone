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
} from '../actions/actionTypes';

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
          const lastActive = Date.parse(nextState[read.slug].lastActive);
          const lastRead = Date.parse(read.accessedAt);
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
        const lastReadInMs = Date.parse(message.lastRead);
        const lastActiveInMs = lastThreadMsg && Date.parse(lastThreadMsg.createdAt);

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

      nextState = {};
      nextState[message.slug] = {
        reactionIds: [],
        readId: read && read.id,
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

      return merge({}, state, nextState);
    }
    case MESSAGE.CREATE.RECEIVE: {
      const { message } = action;
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
      const { messageThreads: { parentMessages, childMessages } } = action;
      nextState = {};

      parentMessages.forEach((parent) => {
        nextState[parent.slug] = parent;
        nextState[parent.slug].thread = [];
      });

      childMessages.forEach((child) => {
        nextState[child.slug] = child;
        nextState[child.parentMessageSlug].thread.push(child.slug);
      });

      return nextState;
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
      nextState[read.slug].lastRead = read.accessedAt;
      nextState[read.slug].readId = read.id;

      const lastRead = Date.parse(read.accessedAt);
      const lastActive = Date.parse(nextState[read.slug].lastActive);
      nextState[read.slug].hasUnreads = lastActive > lastRead;

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
