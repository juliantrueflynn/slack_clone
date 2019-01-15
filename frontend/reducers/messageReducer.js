import merge from 'lodash.merge';
import {
  MESSAGE,
  USER_THREAD,
  REACTION,
  READ,
  FAVORITE,
  WORKSPACE,
  SEARCH,
  PIN,
  SIGN_OUT,
  CHATROOM,
  WORKSPACE_SUB,
} from '../actions/actionTypes';

const _defaultState = {};

const messageReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  let nextState;

  switch (action.type) {
    case MESSAGE.SHOW.RECEIVE:
    case MESSAGE.INDEX.RECEIVE:
    case READ.INDEX.RECEIVE:
    case USER_THREAD.INDEX.RECEIVE:
    case SEARCH.INDEX.RECEIVE:
    case FAVORITE.INDEX.RECEIVE: {
      const {
        messages,
        reactions,
        favorites,
        chatroom,
        pins,
      } = action.messages;

      nextState = {};
      const chatroomSlug = chatroom && chatroom.slug;

      messages.forEach((msg) => {
        nextState[msg.slug] = { reactionIds: [], chatroomSlug, ...msg };
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
            chatroomSlug,
            ...nextState[pin.messageSlug],
          };
        });
      }

      if (favorites) {
        favorites.forEach((fav) => { nextState[fav.messageSlug].favoriteId = fav.id; });
      }

      return merge({}, state, nextState);
    }
    case CHATROOM.SHOW.RECEIVE:
      nextState = action.messages.reduce((acc, curr) => ({ ...acc, [curr.slug]: curr }), {});
      return merge({}, state, nextState);
    case MESSAGE.CREATE.RECEIVE: {
      const { message } = action;
      const { slug, authors, parentMessageSlug: parentSlug } = message;

      nextState = { [slug]: { reactionIds: [], ...message } };

      if (parentSlug && state[parentSlug]) {
        nextState[parentSlug] = { thread: [], ...state[parentSlug], authors };

        nextState[parentSlug].thread.push(slug);
      }

      return merge({}, state, nextState);
    }
    case MESSAGE.UPDATE.RECEIVE:
      if (!state[action.message.slug]) {
        return state;
      }

      nextState = { [action.message.slug]: { body: action.message.body } };

      return merge({}, state, nextState);
    case MESSAGE.DESTROY.RECEIVE: {
      const { slug, parentMessageSlug: parentSlug } = action.message;

      nextState = merge({}, state);

      if (parentSlug && state[parentSlug]) {
        nextState[parentSlug].thread = state[parentSlug].thread.filter(val => val !== slug);
      }

      if (state[slug]) {
        delete nextState[slug];
      }

      return nextState;
    }
    case REACTION.CREATE.RECEIVE: {
      const { id, messageSlug: slug } = action.reaction;

      if (!state[slug]) {
        return state;
      }

      nextState = { [slug]: { reactionIds: [...state[slug].reactionIds, id] } };

      return merge({}, state, nextState);
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
      nextState = { [action.favorite.messageSlug]: { favoriteId: action.favorite.id } };
      return merge({}, state, nextState);
    case FAVORITE.DESTROY.RECEIVE:
      nextState = { [action.favorite.messageSlug]: { favoriteId: null } };
      return merge({}, state, nextState);
    case PIN.CREATE.RECEIVE:
      if (!state[action.pin.messageSlug]) {
        return state;
      }

      nextState = { [action.pin.messageSlug]: { pinId: action.pin.id } };

      return merge({}, state, nextState);
    case PIN.DESTROY.RECEIVE:
      if (!state[action.pin.messageSlug]) {
        return state;
      }

      nextState = { [action.pin.messageSlug]: { pinId: null } };

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
