import merge from 'lodash.merge';
import { MESSAGE, CHANNEL, USER_THREAD, REACTION } from '../actions/actionTypes';

const messageReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case CHANNEL.SHOW.RECEIVE: {
      nextState = Object.assign({}, state);
      const { channel: { messages, reactions }, ui: { messageSlug } } = action;

      messages.forEach((message) => {
        nextState[message.slug] = message;

        const children = messages.filter(child => child.parentMessageSlug === message.slug);
        const messageThread = children.map(entry => entry.slug);

        nextState[message.slug].thread = merge([], nextState[message.slug].thread, messageThread);

        if (messageSlug) {
          const { parentMessageSlug, slug } = message;
          nextState[slug].thread = null;

          if (nextState[messageSlug] && parentMessageSlug === messageSlug) {
            nextState[messageSlug].thread = Object.assign([slug], nextState[messageSlug].thread);
          }
        }
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
      nextState = Object.assign({}, state);
      nextState[slug] = message;
      if (!nextState[slug].thread) nextState[slug].thread = [];

      const newReactions = [];
      reactions.forEach((reaction) => {
        newReactions.push(reaction.id);
      });

      nextState[slug].reactions = Object.assign([], nextState[slug].reactions, newReactions);

      if (childMessages) {
        childMessages.forEach((child) => {
          nextState[child.slug] = child;
          if (nextState[slug].thread.indexOf(child.slug) === -1) {
            nextState[slug].thread.push(child.slug);
          }
        });
      }

      return nextState;
    }
    case MESSAGE.CREATE.RECEIVE: {
      const { message, parentMessageSlug: parentSlug } = action;
      message.thread = parentSlug ? null : [];
      nextState = merge({}, state, { [message.slug]: message });
      if (parentSlug) nextState[parentSlug].thread.push(message.slug);

      return nextState;
    }
    case MESSAGE.UPDATE.RECEIVE: {
      const { message } = action;
      nextState = { [message.slug]: message };

      return merge({}, state, nextState);
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
    default:
      return state;
  }
};

export default messageReducer;
