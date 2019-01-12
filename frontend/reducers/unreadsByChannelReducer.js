import merge from 'lodash.merge';
import {
  READ,
  WORKSPACE,
  CHATROOM,
  UNREAD_UPDATE,
  UNREAD_CLEAR_ALL,
  WORKSPACE_SUB,
  SIGN_OUT,
} from '../actions/actionTypes';

const _defaultState = {};

const unreadsByChannelReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  let nextState;

  switch (action.type) {
    case WORKSPACE.SHOW.RECEIVE:
      return action.workspace.chatrooms.reduce((acc, curr) => ({ ...acc, [curr.slug]: [] }), {});
    case READ.INDEX.RECEIVE: {
      const { messages } = action.messages;

      nextState = {};
      Object.keys(state).forEach((chSlug) => {
        nextState[chSlug] = [];
      });

      messages.forEach((msg) => {
        nextState[msg.chatroomSlug].push(msg.slug);
      });

      return merge({}, state, nextState);
    }
    case CHATROOM.CREATE.RECEIVE:
      nextState = { [action.chatroom.chatroom.slug]: [] };
      return merge({}, state, nextState);
    case UNREAD_UPDATE: {
      const { readableType, slug, messageSlug } = action.unread;

      if (readableType !== 'Channel') {
        return state;
      }

      nextState = merge({}, state);
      nextState[slug].push(messageSlug);

      return nextState;
    }
    case UNREAD_CLEAR_ALL:
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
