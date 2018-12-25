import merge from 'lodash.merge';
import {
  MESSAGE,
  USER_THREAD,
  REACTION,
  READ,
  FAVORITE,
  WORKSPACE,
  HISTORY,
  SEARCH,
  PIN,
  SIGN_OUT,
} from '../actions/actionTypes';

const messageReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState;

  switch (action.type) {
    case WORKSPACE.SHOW.RECEIVE: {
      const { messages, reads } = action.workspace;

      nextState = {};
      messages.forEach((msg) => {
        nextState[msg.slug] = msg;

        if (msg.parentMessageId) {
          nextState[msg.parentMessageSlug] = {
            id: msg.parentMessageId,
            slug: msg.parentMessageSlug,
            channelSlug: msg.channelSlug,
          };
        }
      });

      reads.filter(read => read.readableType === 'Message').forEach(({ slug }) => {
        nextState[slug] = { slug, ...nextState[slug] };
      });

      Object.values(nextState).forEach((msg) => {
        nextState[msg.slug] = { ...msg, reactionIds: [] };

        if (!msg.parentMessageId) {
          nextState[msg.slug].thread = [];
          nextState[msg.slug].authors = [];
        }
      });

      return nextState;
    }
    case MESSAGE.SHOW.RECEIVE:
    case MESSAGE.INDEX.RECEIVE:
    case HISTORY.INDEX.RECEIVE:
    case READ.INDEX.RECEIVE:
    case USER_THREAD.INDEX.RECEIVE:
    case SEARCH.INDEX.RECEIVE:
    case FAVORITE.INDEX.RECEIVE: {
      const {
        messages,
        reactions,
        favorites,
        channel,
        pins,
      } = action.messages;

      nextState = {};
      messages.forEach((msg) => {
        nextState[msg.slug] = {
          channelSlug: channel && channel.slug,
          reactionIds: [],
          thread: [],
          authors: [],
          ...msg
        };
      });

      messages.filter(msg => msg.parentMessageId).forEach((msg) => {
        const parent = nextState[msg.parentMessageSlug];
        nextState[msg.slug].thread = null;

        if (parent) {
          if (!parent.thread.includes(msg.slug)) {
            parent.thread.push(msg.slug);
          }

          if (!parent.authors.includes(msg.authorSlug)) {
            parent.authors.push(msg.authorSlug);
          }
        } else {
          nextState[msg.parentMessageSlug] = {
            slug: msg.parentMessageSlug,
            id: msg.parentMessageId,
            channelSlug: msg.channelSlug,
            reactionIds: [],
            thread: [msg.slug],
            authors: [msg.authorSlug],
          };
        }
      });

      reactions.forEach((reaction) => {
        nextState[reaction.messageSlug].reactionIds.push(reaction.id);
      });

      if (pins) {
        pins.forEach((pin) => {
          nextState[pin.messageSlug].pinId = pin.id;
        });
      }

      if (favorites) {
        favorites.forEach((fav) => {
          nextState[fav.messageSlug].favoriteId = fav.id;
        });
      }

      return merge({}, state, nextState);
    }
    case MESSAGE.CREATE.RECEIVE: {
      const { message } = action;
      const { slug, authorSlug, parentMessageSlug: parentSlug } = message;

      nextState = {};
      nextState[slug] = {
        authors: [],
        reactionIds: [],
        thread: [],
        ...message,
      };

      if (parentSlug) {
        nextState[slug] = { ...nextState[slug], thread: null, authors: null };
        nextState[parentSlug] = {
          thread: [slug],
          authors: [authorSlug],
        };
      }

      if (state[parentSlug]) {
        nextState[parentSlug] = {
          ...state[parentSlug],
          thread: [...state[parentSlug].thread, slug],
        };

        if (!state[parentSlug].authors.includes(authorSlug)) {
          nextState[parentSlug].authors = [...state[parentSlug].authors, authorSlug];
        }
      }

      return merge({}, state, nextState);
    }
    case MESSAGE.UPDATE.RECEIVE:
      nextState = {};
      nextState[action.message.slug] = { body: action.message.body };
      return merge({}, state, nextState);
    case MESSAGE.DESTROY.RECEIVE: {
      const { slug, parentMessageSlug: parentSlug } = action.message;
      nextState = merge({}, state);

      if (parentSlug && state[parentSlug]) {
        nextState[parentSlug].thread = state[parentSlug].thread.filter(val => val !== slug);
      }

      delete nextState[slug];
      return nextState;
    }
    case REACTION.CREATE.RECEIVE: {
      const { id, messageSlug: slug } = action.reaction;

      if (!state[slug]) {
        return state;
      }

      nextState = merge({}, state);
      nextState[slug].reactionIds = [...state[slug].reactionIds, id];
      return nextState;
    }
    case REACTION.DESTROY.RECEIVE: {
      const { id, messageSlug: slug } = action.reaction;

      if (!state[slug]) {
        return state;
      }

      nextState = merge({}, state);
      nextState[slug].reactionIds = state[slug].reactionIds.filter(val => val !== id);
      return nextState;
    }
    case FAVORITE.CREATE.RECEIVE:
      nextState = {};
      nextState[action.favorite.messageSlug] = { favoriteId: action.favorite.id };
      return merge({}, state, nextState);
    case FAVORITE.DESTROY.RECEIVE:
      nextState = {};
      nextState[action.favorite.messageSlug] = { favoriteId: null };
      return merge({}, state, nextState);
    case PIN.CREATE.RECEIVE:
      nextState = {};
      nextState[action.pin.messageSlug] = { pinId: action.pin.id };
      return merge({}, state, nextState);
    case PIN.DESTROY.RECEIVE:
      nextState = {};
      nextState[action.pin.messageSlug] = { pinId: null };
      return merge({}, state, nextState);
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default messageReducer;
