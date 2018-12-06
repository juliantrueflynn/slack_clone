import merge from 'lodash.merge';
import { isDateOlderThanOther } from '../util/dateUtil';
import { pushReduce, filterPop } from '../util/reducerUtil';
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
        nextState[msg.slug] = msg;

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
        nextState[read.slug] = { slug: read.slug, ...nextState[read.slug] };
        nextState[read.slug].readId = read.id;
        nextState[read.slug].lastRead = read.accessedAt;
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

        if (action.type === MESSAGE.SHOW.RECEIVE || action.type === FAVORITE.INDEX.RECEIVE) {
          nextState[msg.slug].isOpen = true;
        }

        if (action.type === USER_THREAD.INDEX.RECEIVE) {
          nextState[msg.slug].isInConvo = true;
          nextState[msg.slug].hasUnreads = false;
        }
      });

      messages.filter(msg => msg.parentMessageId).forEach((msg) => {
        const parent = nextState[msg.parentMessageSlug];

        if (!parent) {
          nextState[msg.parentMessageSlug] = {
            slug: msg.parentMessageSlug,
            id: msg.parentMessageId,
            channelSlug: msg.channelSlug,
            reactionIds: [],
            thread: [msg.slug],
            authors: [msg.authorSlug],
          };
        } else {
          if (!parent.thread.includes(msg.slug)) {
            parent.thread.push(msg.slug);
          }

          if (!parent.authors.includes(msg.authorSlug)) {
            parent.authors.push(msg.authorSlug);
          }
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
      nextState = Object.assign({}, state);
      Object.values(nextState).forEach((msg) => {
        nextState[msg.slug].isInSearch = false;
      });

      return nextState;
    }
    case SEARCH.INDEX.RECEIVE: {
      const { messages, reactions } = action.messages;

      nextState = {};
      messages.forEach((msg) => {
        nextState[msg.slug] = {
          isInSearch: true,
          reactionIds: [],
          thread: msg.parentMessageId ? null : [],
          authors: [msg.authorSlug],
          ...msg
        };
      });

      reactions.forEach((reaction) => {
        nextState[reaction.messageSlug].reactionIds.push(reaction.id);
      });

      return merge({}, state, nextState);
    }
    case MESSAGE.SHOW.REQUEST: {
      const { messageSlug } = action;

      nextState = Object.assign({}, state);
      Object.values(state).filter(msg => msg.isOpen).forEach((msg) => {
        nextState[msg.slug].isOpen = false;
      });

      if (nextState[messageSlug]) {
        nextState[messageSlug].isOpen = true;
      }

      return nextState;
    }
    case MESSAGE.CREATE.REQUEST: {
      const { parentMessageSlug } = action.message;

      if (!parentMessageSlug) {
        return state;
      }

      nextState = Object.assign({}, state);
      nextState[parentMessageSlug].isInConvo = true;

      return nextState;
    }
    case MESSAGE.CREATE.RECEIVE: {
      const { message } = action;
      nextState = Object.assign({}, state);
      nextState[message.slug] = {
        authors: [message.authorSlug],
        ...message
      };

      if (message.parentMessageSlug) {
        const parent = {
          id: message.parentMessageId,
          slug: message.parentMessageSlug,
          channelSlug: message.channelSlug,
          thread: [],
          reactionIds: [],
          authors: [],
          ...nextState[message.parentMessageSlug],
        };

        parent.lastActive = message.createdAt;
        parent.authors = parent.authors.reduce((acc, curr) => (
          pushReduce(acc, curr)
        ), [message.authorSlug]);
        parent.thread.push(message.slug);

        if (!parent.isOpen) {
          parent.hasUnreads = isDateOlderThanOther(parent.lastRead, message.createdAt);
          nextState[message.slug].isUnread = true;
        }

        nextState[message.parentMessageSlug] = parent;
      }

      return nextState;
    }
    case MESSAGE.UPDATE.RECEIVE: {
      const { message } = action;
      nextState = Object.assign({}, state);
      nextState[message.slug].body = message.body;
      return nextState;
    }
    case MESSAGE.DESTROY.RECEIVE: {
      const { slug, parentMessageSlug } = action.message;
      nextState = Object.assign({}, state);

      if (parentMessageSlug) {
        const parent = nextState[parentMessageSlug];
        parent.thread = filterPop(parent.thread, slug);
      }

      delete nextState[slug];
      return nextState;
    }
    case REACTION.CREATE.RECEIVE: {
      const { id, messageSlug } = action.reaction;

      nextState = Object.assign({}, state);
      if (nextState[messageSlug]) {
        nextState[messageSlug].reactionIds.push(id);
      }

      return nextState;
    }
    case REACTION.DESTROY.RECEIVE: {
      const { id, messageSlug: slug } = action.reaction;

      nextState = Object.assign({}, state);

      if (nextState[slug]) {
        nextState[slug].reactionIds = filterPop(nextState[slug].reactionIds, id);
      }

      return nextState;
    }
    case READ.CREATE.RECEIVE:
    case READ.UPDATE.RECEIVE: {
      const { read } = action;

      if (read.readableType !== 'Message') {
        return state;
      }

      nextState = Object.assign({}, state);
      nextState[read.slug].readId = read.id;
      nextState[read.slug].lastRead = read.accessedAt;
      nextState[read.slug].hasUnreads = false;

      return nextState;
    }
    case READ.DESTROY.RECEIVE:
      nextState = Object.assign({}, state);
      nextState[action.read.slug].readId = null;
      return nextState;
    case READ.INDEX.RECEIVE:
      nextState = action.messages.messages.reduce((acc, curr) => {
        acc[curr.slug] = curr;
        return acc;
      }, {});

      return merge({}, state, nextState);
    case FAVORITE.CREATE.RECEIVE:
      nextState = Object.assign({}, state);
      nextState[action.favorite.messageSlug].favoriteId = action.favorite.id;
      return nextState;
    case FAVORITE.DESTROY.RECEIVE:
      nextState = Object.assign({}, state);
      nextState[action.favorite.messageSlug].favoriteId = null;
      return nextState;
    case PIN.CREATE.RECEIVE: {
      nextState = Object.assign({}, state);

      if (nextState[action.pin.messageSlug]) {
        nextState[action.pin.messageSlug].pinId = action.pin.id;
      }

      return nextState;
    }
    case PIN.DESTROY.RECEIVE: {
      nextState = Object.assign({}, state);

      if (nextState[action.pin.messageSlug]) {
        nextState[action.pin.messageSlug].pinId = null;
      }

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
