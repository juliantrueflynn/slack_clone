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
  CHANNEL,
  WORKSPACE_SUB,
} from '../actions/actionTypes';

const _defaultState = {};

const messageReducer = (state = _defaultState, action) => {
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
      const channelSlug = channel && channel.slug;

      messages.forEach((msg) => {
        nextState[msg.slug] = { reactionIds: [], channelSlug, ...msg };
      });

      messages.filter(msg => !msg.parentMessageId).forEach((msg) => {
        nextState[msg.slug].thread = [];
        nextState[msg.slug].authors = [msg.authorSlug];
      });

      messages.filter(msg => (
        msg.parentMessageId && nextState[msg.parentMessageSlug]
      )).forEach((msg) => {
        const parent = nextState[msg.parentMessageSlug];

        if (!parent.thread.includes(msg.slug)) {
          parent.thread.push(msg.slug);
        }

        if (!parent.authors.includes(msg.authorSlug)) {
          parent.authors.push(msg.authorSlug);
        }
      });

      reactions.forEach((reaction) => {
        nextState[reaction.messageSlug].reactionIds.push(reaction.id);
      });

      if (pins) {
        pins.forEach((pin) => {
          nextState[pin.messageSlug] = {
            id: pin.messageId,
            slug: pin.messageSlug,
            pinId: pin.id,
            reactionIds: [],
            thread: [],
            authors: [],
            entityType: 'entry',
            channelSlug,
            ...nextState[pin.messageSlug],
          };
        });
      }

      if (favorites) {
        favorites.forEach((fav) => {
          nextState[fav.messageSlug].favoriteId = fav.id;
        });
      }

      return merge({}, state, nextState);
    }
    case CHANNEL.SHOW.RECEIVE:
      nextState = {};
      action.channel.messages.forEach((msg) => { nextState[msg.slug] = msg; });
      return merge({}, state, nextState);
    case MESSAGE.CREATE.RECEIVE: {
      const { message, parentMessage } = action.message;
      const { slug, authorSlug } = message;

      nextState = {};
      nextState[slug] = {
        reactionIds: [],
        authors: parentMessage ? null : [],
        thread: parentMessage ? null : [],
        ...message,
      };

      if (parentMessage) {
        nextState[parentMessage.slug] = {
          ...state[parentMessage.slug],
          ...parentMessage,
          thread: [...state[parentMessage.slug].thread, slug]
        };

        if (!state[parentMessage.slug].authors.includes(authorSlug)) {
          nextState[parentMessage.slug].authors = [
            ...state[parentMessage.slug].authors,
            authorSlug
          ];
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
    case WORKSPACE_SUB.CREATE.REQUEST:
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default messageReducer;
