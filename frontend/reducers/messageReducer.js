import merge from 'lodash.merge';
import {
  CREATE_MESSAGE,
  UPDATE_MESSAGE,
  DELETE_MESSAGE,
  MESSAGE,
  CHANNEL,
} from '../actions/actionTypes';

const messageReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case CHANNEL.RECEIVE: {
      nextState = Object.assign({}, state);
      const { channel: { messages, reactions }, ui: { messageSlug } } = action;

      messages.map((message) => {
        nextState[message.slug] = message;
        nextState[message.slug].thread = nextState[message.slug].thread || [];

        if (messageSlug) {
          const { parentMessageSlug, slug } = message;
          nextState[slug].thread = null;

          if (nextState[messageSlug] && parentMessageSlug === messageSlug) {
            nextState[messageSlug].thread = Object.assign(
              [slug],
              nextState[messageSlug].thread
            );
          }
        }
      });

      reactions.map((reaction) => {
        if (nextState[reaction.messageSlug]) {
          nextState[reaction.messageSlug].reactions = Object.assign(
            [],
            nextState[reaction.messageSlug].reactions,
            [reaction.id]
          );
        }
      });

      return nextState;
    }
    case MESSAGE.RECEIVE: {
      const { message: { message, thread, reactions } } = action;
      nextState = Object.assign({}, state);
      const { slug } = message;
      nextState[slug] = message;
      nextState[slug].thread = [];

      const newReactions = [];
      reactions.map((reaction) => {
        newReactions.push(reaction.id);
      });

      nextState[slug].reactions = Object.assign(
        [],
        nextState[slug].reactions,
        newReactions
      );

      if (thread) {
        thread.map((entry) => {
          nextState[entry.slug] = entry;
          nextState[slug].thread.push(entry.slug);
        });
      }

      return nextState;
    }
    case CREATE_MESSAGE.RECEIVE: {
      const { message, parentMessageSlug } = action;
      nextState = { [message.slug]: message };
      if (parentMessageSlug) {
        nextState[parentMessageSlug] = { thread: [message.slug] };
      }

      return merge({}, state, nextState);
    }
    case UPDATE_MESSAGE.RECEIVE:
      nextState = { [action.message.slug]: action.message };
      return Object.assign({}, state, nextState);
    case DELETE_MESSAGE.RECEIVE:
      nextState = Object.assign({}, state);
      delete nextState[action.messageSlug];
      return nextState;
    default:
      return state;
  }
};

export default messageReducer;
