import merge from 'lodash.merge';
import { MESSAGE, CHANNEL, THREAD_MESSAGE } from '../actions/actionTypes';

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
      const { message: { message, thread, reactions } } = action;
      nextState = Object.assign({}, state);
      const { slug } = message;
      nextState[slug] = message;
      nextState[slug].thread = [];

      const newReactions = [];
      reactions.forEach((reaction) => {
        newReactions.push(reaction.id);
      });

      nextState[slug].reactions = Object.assign([], nextState[slug].reactions, newReactions);

      if (thread) {
        thread.forEach((entry) => {
          nextState[entry.slug] = entry;
          nextState[slug].thread.push(entry.slug);
        });
      }

      return nextState;
    }
    case THREAD_MESSAGE.CREATE.RECEIVE: {
      const { message, parentMessageSlug: parentSlug } = action;
      message.thread = null;
      nextState = merge({}, state, { [message.slug]: message });
      nextState[parentSlug].thread.push(message.slug);
      return nextState;
    }
    case MESSAGE.CREATE.RECEIVE: {
      const { message } = action;
      message.thread = [];
      return merge({}, state, { [message.slug]: message });
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
    default:
      return state;
  }
};

export default messageReducer;
