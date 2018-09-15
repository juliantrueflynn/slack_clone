import merge from 'lodash.merge';
import {
  MESSAGE,
  USER_THREAD,
  REACTION,
  READ,
  FAVORITE,
  WORKSPACE,
  SIGN_OUT,
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
        const children = messages.filter(child => child.parentMessageSlug === message.slug);
        const messageThread = children.map(child => child.slug);
        const popThreadMsg = children[children.length - 1];
        const lastReadInMs = Date.parse(message.lastRead);
        const lastActiveInMs = popThreadMsg && Date.parse(popThreadMsg.createdAt);

        nextState[message.slug] = {
          reactionIds: [],
          favoriteId: null,
          readId: null,
          lastActive: popThreadMsg && popThreadMsg.createdAt,
          hasUnreads: lastReadInMs < lastActiveInMs,
          thread: children.map(child => child.slug),
          ...message,
        };

        nextState[message.slug].thread = merge([], nextState[message.slug].thread, messageThread);
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

      return nextState;
    }
    case MESSAGE.SHOW.RECEIVE: {
      const {
        message,
        childMessages,
        reactions,
        favorites,
      } = action.message;
      const { slug } = message;
      nextState = { [slug]: message };
      if (!nextState[slug].thread) nextState[slug].thread = [];

      const newReactions = [];
      reactions.forEach((reaction) => { newReactions.push(reaction.id); });

      nextState[slug].reactionIds = Object.assign([], nextState[slug].reactionIds, newReactions);

      if (childMessages) {
        childMessages.forEach((child) => {
          nextState[child.slug] = child;
          if (nextState[slug].thread.indexOf(child.slug) === -1) {
            nextState[slug].thread.push(child.slug);
          }
        });
      }

      favorites.forEach(({ id, messageSlug }) => {
        if (nextState[messageSlug]) nextState[messageSlug].favoriteId = id;
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
    case READ.CREATE.RECEIVE: {
      const { read } = action;
      if (read.readableType !== 'Message') return state;
      nextState = Object.assign({}, state);
      nextState[read.slug].lastRead = read.accessedAt;
      nextState[read.slug].readId = read.id;
      return nextState;
    }
    case READ.UPDATE.RECEIVE: {
      const { read } = action;
      if (read.readableType !== 'Message') return state;
      nextState = Object.assign({}, state);
      nextState[read.slug].lastRead = read.accessedAt;
      nextState[read.slug].readId = read.id;
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

      if (!unreads) return state;

      nextState = unreads.reduce((acc, curr) => {
        acc[curr.slug] = curr;
        return acc;
      }, {});

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
