import merge from 'lodash.merge';
import { isDateOlderThanOther } from '../util/dateUtil';
import {
  MESSAGE,
  USER_THREAD,
  REACTION,
  READ,
  FAVORITE,
  WORKSPACE,
  SIGN_OUT,
  UNREAD,
  DRAWER_CLOSE,
  HISTORY,
  SEARCH,
  MODAL_CLOSE,
  SEARCH_DESTROY,
  PIN,
} from '../actions/actionTypes';

const messageReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case WORKSPACE.SHOW.RECEIVE: {
      const { messages, unreads, reads } = action.workspace;

      nextState = Object.assign({}, state);
      messages.filter(msg => msg.entityType === 'entry').forEach((message) => {
        nextState[message.slug] = message;
      });

      unreads.filter(unread => nextState[unread.slug] && unread.unreadableType === 'Message').forEach((unread) => {
        nextState[unread.slug].unreadId = unread.id;
        nextState[unread.slug].lastActive = unread.activeAt;
      });

      reads.filter(read => nextState[read.slug] && read.readableType === 'Message').forEach((read) => {
        nextState[read.slug].readId = read.id;
        nextState[read.slug].lastRead = read.accessedAt;
      });

      Object.values(nextState).forEach((message) => {
        nextState[message.slug] = {
          hasUnreads: isDateOlderThanOther(message.lastRead, message.lastActive),
          isInConvo: true,
          reactionIds: [],
          thread: [],
          ...message,
        };
      });

      return nextState;
    }
    case MESSAGE.INDEX.REQUEST:
    case USER_THREAD.INDEX.REQUEST:
    case UNREAD.INDEX.REQUEST: {
      nextState = {};
      Object.values(state).filter(msg => msg.isInConvo).forEach(({ slug }) => {
        const isActiveConvo = action.type === USER_THREAD.INDEX.REQUEST;
        nextState[slug] = { isActiveConvo };
      });

      return merge({}, state, nextState);
    }
    case USER_THREAD.INDEX.RECEIVE:
    case MESSAGE.SHOW.RECEIVE:
    case FAVORITE.INDEX.RECEIVE:
    case HISTORY.INDEX.RECEIVE:
    case MESSAGE.INDEX.RECEIVE: {
      const {
        messages,
        reactions,
        favorites,
        channel,
        pins,
      } = action.messages;

      nextState = Object.assign({}, state);
      messages.forEach((message) => {
        const children = messages.filter(msg => msg.parentMessageId === message.id);
        const thread = children.map(child => child.slug);
        const authors = children.reduce((acc, curr) => {
          if (acc.includes(curr.authorSlug)) {
            return acc;
          }

          acc.push(curr.authorSlug);

          return acc;
        }, []);

        nextState[message.slug] = {
          reactionIds: [],
          authors,
          thread,
          ...message,
        };

        if (channel) {
          nextState[message.slug].channelSlug = channel.slug;
        }

        if (action.type === MESSAGE.SHOW.RECEIVE || action.type === FAVORITE.INDEX.RECEIVE) {
          nextState[message.slug].isInDrawer = true;
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
    case MODAL_CLOSE:
    case SEARCH.INDEX.REQUEST: {
      nextState = Object.assign({}, state);
      Object.values(nextState).forEach((message) => {
        nextState[message.slug].isInSearch = false;
      });

      return nextState;
    }
    case SEARCH.INDEX.RECEIVE: {
      const { messages, reactions } = action.messages;

      nextState = {};
      messages.forEach((message) => {
        nextState[message.slug] = message;
        nextState[message.slug].isInSearch = true;
        nextState[message.slug].reactionIds = [];
        nextState[message.slug].thread = [];
      });

      reactions.forEach((reaction) => {
        nextState[reaction.messageSlug].reactionIds.push(reaction.id);
      });

      return merge({}, state, nextState);
    }
    case DRAWER_CLOSE:
    case MESSAGE.SHOW.REQUEST: {
      const { messageSlug } = action;

      nextState = {};
      Object.values(state).forEach((message) => {
        nextState[message.slug] = { isOpen: false, isInDrawer: false };
      });

      if (messageSlug) {
        nextState[messageSlug] = { isOpen: true };
      }

      return merge({}, state, nextState);
    }
    case MESSAGE.CREATE.REQUEST: {
      const { message: { parentMessageSlug } } = action;

      if (!parentMessageSlug) {
        return state;
      }

      nextState = Object.assign({}, state);
      nextState[parentMessageSlug].isInConvo = true;

      return nextState;
    }
    case MESSAGE.CREATE.RECEIVE: {
      const { message, authors } = action.message;
      nextState = Object.assign({}, state);
      nextState[message.slug] = {
        thread: message.parentMessageId ? null : [],
        reactionIds: [],
        ...message
      };

      if (message.parentMessageSlug) {
        if (!nextState[message.parentMessageSlug]) {
          nextState[message.parentMessageSlug] = {
            id: message.parentMessageId,
            slug: message.parentMessageSlug,
            thread: [],
            lastActive: message.createdAt,
            channelSlug: message.channelSlug,
          };
        }

        nextState[message.parentMessageSlug].authors = authors;
        nextState[message.parentMessageSlug].thread.push(message.slug);
      }

      return nextState;
    }
    case MESSAGE.UPDATE.RECEIVE: {
      const { message } = action;
      nextState = {};
      nextState[message.slug] = message;
      return merge({}, state, nextState);
    }
    case MESSAGE.DESTROY.RECEIVE:
      nextState = Object.assign({}, state);
      delete nextState[action.message.slug];
      return nextState;
    case REACTION.CREATE.RECEIVE: {
      const { reaction, messageSlug } = action;
      nextState = { [messageSlug]: { reactionIds: [reaction.id] } };
      return merge({}, state, nextState);
    }
    case READ.CREATE.RECEIVE:
    case READ.UPDATE.RECEIVE: {
      const { read } = action;
      nextState = Object.assign({}, state);

      if (read.readableType !== 'Message' || nextState[read.slug].entityType !== 'entry') {
        return state;
      }

      nextState[read.slug].readId = read.id;
      nextState[read.slug].lastRead = read.accessedAt;

      const { lastRead, lastActive } = nextState[read.slug];
      nextState[read.slug].hasUnreads = isDateOlderThanOther(lastRead, lastActive);

      if (nextState[read.slug].isOpen || nextState[read.slug].isActiveConvo) {
        nextState[read.slug].hasUnreads = false;
      }

      return nextState;
    }
    case UNREAD.CREATE.RECEIVE:
    case UNREAD.UPDATE.RECEIVE: {
      const { unread } = action;
      nextState = Object.assign({}, state);

      if (unread.unreadableType !== 'Message' || nextState[unread.slug].entityType !== 'entry') {
        return state;
      }

      nextState[unread.slug].unreadId = unread.id;
      nextState[unread.slug].lastActive = unread.activeAt;

      const { lastRead, lastActive } = nextState[unread.slug];
      nextState[unread.slug].hasUnreads = isDateOlderThanOther(lastRead, lastActive);

      if (nextState[unread.slug].isOpen || nextState[unread.slug].isActiveConvo) {
        nextState[unread.slug].hasUnreads = false;
      }

      return nextState;
    }
    case FAVORITE.CREATE.RECEIVE: {
      const { id, messageSlug } = action.favorite;
      nextState = Object.assign({}, state);
      nextState[messageSlug].favoriteId = id;
      nextState[messageSlug].isInDrawer = true;
      return nextState;
    }
    case FAVORITE.DESTROY.RECEIVE: {
      const { messageSlug } = action.favorite;
      nextState = Object.assign({}, state);
      nextState[messageSlug].favoriteId = null;
      nextState[messageSlug].isInDrawer = false;
      return nextState;
    }
    case UNREAD.INDEX.RECEIVE: {
      const { unreads } = action;

      nextState = unreads.reduce((acc, curr) => {
        acc[curr.slug] = curr;
        return acc;
      }, {});

      return merge({}, state, nextState);
    }
    case PIN.CREATE.RECEIVE: {
      const { pin } = action;
      nextState = Object.assign({}, state);

      if (nextState[pin.messageSlug]) {
        nextState[pin.messageSlug].pinId = pin.id;
      }

      return nextState;
    }
    case PIN.DESTROY.RECEIVE: {
      const { pin } = action;
      nextState = Object.assign({}, state);

      if (nextState[pin.messageSlug]) {
        nextState[pin.messageSlug].pinId = null;
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
