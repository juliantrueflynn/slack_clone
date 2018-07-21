import merge from 'lodash.merge';
import { MESSAGE, CHANNEL, USER_THREAD, REACTION, READ, USER_UNREADS, FAVORITE } from '../actions/actionTypes';

const messageReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case CHANNEL.SHOW.RECEIVE: {
      nextState = Object.assign({}, state);
      const { channel: { messages, reactions, favorites } } = action;

      messages.forEach((message) => {
        const { parentMessageSlug, slug, ...props } = message;
        const children = messages.filter(child => child.parentMessageSlug === slug);
        const messageThread = children.map(child => child.slug);

        nextState[slug] = message;
        nextState[slug].reactionIds = [];
        nextState[slug].favoriteId = null;
        nextState[slug].thread = merge([], nextState[slug].thread, messageThread);

        const popThreadMsg = children[children.length - 1];
        const lastReadInMs = Date.parse(props.lastRead);
        const lastActiveInMs = popThreadMsg && Date.parse(popThreadMsg.createdAt);
        nextState[slug].lastActive = popThreadMsg && popThreadMsg.createdAt;
        nextState[slug].hasUnreads = lastReadInMs < lastActiveInMs;
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
      const { parentMessageSlug: parentSlug, slug, updatedAt } = message;
      message.thread = parentSlug ? null : [];
      message.lastRead = null;
      message.reactionIds = [];
      message.favoriteId = null;
      nextState = merge({}, state, { [slug]: message });
      if (parentSlug) {
        nextState[parentSlug].thread.push(slug);
        nextState[parentSlug].lastActive = updatedAt;
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
    case READ.UPDATE.RECEIVE: {
      const { read: { readableType, slug, accessedAt } } = action;
      if (readableType !== 'Message') return state;
      nextState = Object.assign({}, state);
      nextState[slug].lastRead = accessedAt;
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
    case USER_UNREADS.INDEX.RECEIVE:
      return action.unreads.messages.reduce((acc, curr) => {
        acc[curr.slug] = curr;
        return acc;
      }, {});
    default:
      return state;
  }
};

export default messageReducer;
