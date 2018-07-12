import merge from 'lodash.merge';
import { MESSAGE, CHANNEL, USER_THREAD, REACTION, READ, USER_UNREADS } from '../actions/actionTypes';

const messageReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case CHANNEL.SHOW.RECEIVE: {
      nextState = Object.assign({}, state);
      const { channel: { messages, reactions } } = action;

      messages.forEach((message) => {
        const { parentMessageSlug, slug, ...props } = message;
        const children = messages.filter(child => child.parentMessageSlug === slug);
        const messageThread = children.map(child => child.slug);

        nextState[slug] = message;
        nextState[slug].thread = merge([], nextState[slug].thread, messageThread);

        const lastReadInMs = Date.parse(props.lastRead);
        const lastActiveInMs = Date.parse(props.lastActive);
        nextState[slug].hasUnreads = lastReadInMs < lastActiveInMs;
      });

      reactions.forEach(({ messageSlug: slug, id }) => {
        if (nextState[slug]) {
          nextState[slug].reactions = Object.assign([], nextState[slug].reactions, [id]);
        }
      });

      return nextState;
    }
    case MESSAGE.SHOW.RECEIVE: {
      const { message: { message, childMessages, reactions } } = action;
      const { slug } = message;
      nextState = { [slug]: message };
      if (!nextState[slug].thread) nextState[slug].thread = [];

      const newReactions = [];
      reactions.forEach((reaction) => { newReactions.push(reaction.id); });

      nextState[slug].reactions = Object.assign([], nextState[slug].reactions, newReactions);

      if (childMessages) {
        childMessages.forEach((child) => {
          nextState[child.slug] = child;
          if (nextState[slug].thread.indexOf(child.slug) === -1) {
            nextState[slug].thread.push(child.slug);
          }
        });
      }

      return merge({}, state, nextState);
    }
    case MESSAGE.CREATE.RECEIVE: {
      const { message, parentMessageSlug: parentSlug } = action;
      message.thread = parentSlug ? null : [];
      message.lastRead = null;
      nextState = merge({}, state, { [message.slug]: message });
      if (parentSlug) {
        nextState[parentSlug].thread.push(message.slug);
        nextState[parentSlug].lastActive = message.updatedAt;
      }
      return nextState;
    }
    case MESSAGE.UPDATE.RECEIVE: {
      const { message } = action;
      return merge({}, state, { [message.slug]: message });
    }
    case MESSAGE.DELETE.RECEIVE:
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
      nextState = { [messageSlug]: { reactions: [reaction.id] } };
      return merge({}, state, nextState);
    }
    case READ.UPDATE.RECEIVE: {
      const { read: { readableType, slug, accessedAt } } = action;
      if (readableType !== 'Message') return state;
      nextState = Object.assign({}, state);
      nextState[slug].lastRead = accessedAt;
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
