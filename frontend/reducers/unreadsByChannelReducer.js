import merge from 'lodash.merge';
import {
  READ,
  WORKSPACE,
  CHANNEL,
  CREATE_UNREAD,
  CLEAR_UNREADS,
  WORKSPACE_SUB,
  SIGN_OUT,
} from '../actions/actionTypes';

const _defaultState = {};

const unreadsByChannelReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  let nextState;

  switch (action.type) {
    case WORKSPACE.SHOW.RECEIVE:
      return action.workspace.channels.reduce((acc, curr) => ({ ...acc, [curr.slug]: [] }), {});
    case READ.INDEX.RECEIVE: {
      const { messages } = action.messages;

      nextState = {};
      Object.keys(state).forEach((chSlug) => {
        nextState[chSlug] = [];
      });

      messages.forEach((msg) => {
        nextState[msg.channelSlug].push(msg.slug);
      });

      return merge({}, state, nextState);
    }
    case CHANNEL.CREATE.RECEIVE:
      nextState = { [action.channel.channel.slug]: [] };
      return merge({}, state, nextState);
    case CREATE_UNREAD: {
      const { readableType, slug, messageSlug } = action.unread;

      if (readableType !== 'Channel') {
        return state;
      }

      nextState = merge({}, state);
      nextState[slug].push(messageSlug);

      return nextState;
    }
    case CLEAR_UNREADS:
      nextState = merge({}, state, nextState);
      nextState[action.chatPath] = [];
      return nextState;
    case WORKSPACE_SUB.CREATE.REQUEST:
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default unreadsByChannelReducer;
