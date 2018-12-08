import merge from 'lodash.merge';
import { isDateOlderThanOther } from '../util/dateUtil';
import {
  MESSAGE,
  USER_THREAD,
  REACTION,
  READ,
  FAVORITE,
  WORKSPACE,
  HISTORY,
  SEARCH,
  SEARCH_DESTROY,
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
        nextState[msg.slug] = { ...msg };

        if (msg.parentMessageId) {
          nextState[msg.parentMessageSlug] = {
            slug: msg.parentMessageSlug,
            id: msg.parentMessageId,
            lastActive: msg.createdAt,
            channelSlug: msg.channelSlug,
            isInConvo: true,
          };
        }
      });

      reads.filter(read => read.readableType === 'Message').forEach((read) => {
        nextState[read.slug] = {
          slug: read.slug,
          readId: read.id,
          lastRead: read.accessedAt,
          ...nextState[read.slug]
        };
      });

      Object.values(nextState).forEach((msg) => {
        nextState[msg.slug] = {
          hasUnreads: isDateOlderThanOther(msg.lastRead, msg.lastActive),
          authors: [],
          thread: [],
          reactionIds: [],
          ...msg,
        };
      });

      return nextState;
    }
    case MESSAGE.SHOW.RECEIVE:
    case MESSAGE.INDEX.RECEIVE:
    case HISTORY.INDEX.RECEIVE:
    case USER_THREAD.INDEX.RECEIVE:
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
          thread: msg.parentMessageId ? null : [],
          authors: msg.parentMessageId ? null : [],
          ...msg
        };

        if (action.type === USER_THREAD.INDEX.RECEIVE) {
          nextState[msg.slug].isInConvo = true;
          nextState[msg.slug].hasUnreads = false;
        }
      });

      messages.filter(msg => msg.parentMessageId).forEach((msg) => {
        const parent = nextState[msg.parentMessageSlug];

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

      if (pins) {
        pins.forEach((pin) => {
          nextState[pin.messageSlug].pinId = pin.id;
        });
      }

      reactions.forEach((reaction) => {
        nextState[reaction.messageSlug].reactionIds.push(reaction.id);
      });

      favorites.forEach((fav) => {
        nextState[fav.messageSlug].favoriteId = fav.id;
      });

      return merge({}, state, nextState);
    }
    case SEARCH_DESTROY:
    case SEARCH.INDEX.REQUEST: {
      nextState = {};
      Object.values(state).forEach((msg) => {
        nextState[msg.slug] = { isInSearch: false };
      });

      return merge({}, state, nextState);
    }
    case SEARCH.INDEX.RECEIVE: {
      const { messages, reactions } = action.messages;

      nextState = {};
      messages.forEach((msg) => {
        nextState[msg.slug] = {
          isInSearch: true,
          reactionIds: [],
          thread: msg.parentMessageId ? null : [],
          authors: [],
          ...msg
        };
      });

      reactions.forEach((reaction) => {
        nextState[reaction.messageSlug].reactionIds.push(reaction.id);
      });

      return merge({}, state, nextState);
    }
    case MESSAGE.CREATE.REQUEST: {
      const { parentMessageSlug } = action.message;

      if (!parentMessageSlug) {
        return state;
      }

      nextState = {};
      nextState[parentMessageSlug] = { isInConvo: true };

      return merge({}, state, nextState);
    }
    case MESSAGE.CREATE.RECEIVE: {
      const { message } = action;
      const { slug, authorSlug, parentMessageSlug: parentSlug } = message;

      nextState = {};
      nextState[slug] = {
        authors: [authorSlug],
        reactionIds: [],
        ...message
      };

      if (parentSlug && state[parentSlug]) {
        nextState[parentSlug] = {
          ...state[parentSlug],
          channelSlug: message.channelSlug,
          lastActive: message.createdAt,
          thread: [...state[parentSlug].thread, slug],
        };

        if (!nextState[parentSlug].authors.includes(authorSlug)) {
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
    case READ.CREATE.RECEIVE:
    case READ.UPDATE.RECEIVE: {
      const { read } = action;

      if (read.readableType !== 'Message') {
        return state;
      }

      nextState = {};
      nextState[read.slug] = {
        readId: read.id,
        lastRead: read.accessedAt,
        hasUnreads: false,
      };

      return merge({}, state, nextState);
    }
    case READ.DESTROY.RECEIVE:
      nextState = {};
      nextState[action.read.slug] = { readId: null };
      return merge({}, state, nextState);
    case READ.INDEX.RECEIVE:
      nextState = action.messages.messages.reduce((acc, curr) => {
        acc[curr.slug] = curr;
        return acc;
      }, {});

      return merge({}, state, nextState);
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
