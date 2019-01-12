import merge from 'lodash.merge';
import {
  WORKSPACE,
  CHATROOM,
  MESSAGE,
  CHATROOM_SUB,
  WORKSPACE_SUB,
  SCROLL_LOCATION_UPDATE,
  SIGN_OUT,
  UNREAD_UPDATE,
  PIN,
} from '../actions/actionTypes';

const chatroomReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case CHATROOM.INDEX.RECEIVE:
      nextState = action.chatrooms.reduce((acc, curr) => ({ ...acc, [curr.slug]: curr }), {});
      return merge({}, state, nextState);
    case CHATROOM.CREATE.RECEIVE: {
      const { chatroom, chatroomSubs, members } = action.chatroom;

      nextState = {};
      nextState[chatroom.slug] = {
        subs: chatroomSubs.map(sub => sub.id),
        members: chatroom.hasDm ? members : [chatroom.ownerSlug],
        messages: [],
        pins: [],
        shouldFetch: true,
        ...chatroom,
      };

      return merge({}, state, nextState);
    }
    case CHATROOM.UPDATE.RECEIVE:
      nextState = {};
      nextState[action.chatroom.slug] = {
        title: action.chatroom.title,
        topic: action.chatroom.topic,
      };

      return merge({}, state, nextState);
    case WORKSPACE.SHOW.RECEIVE: {
      const { workspace, chatrooms, chatroomSubs } = action.workspace;

      nextState = {};
      chatrooms.forEach((ch) => {
        nextState[ch.slug] = {
          workspaceSlug: workspace.slug,
          subs: [],
          members: [],
          messages: [],
          pins: [],
          shouldFetch: true,
          ...ch
        };
      });

      chatroomSubs.forEach((sub) => {
        nextState[sub.chatroomSlug].subs.push(sub.id);
        nextState[sub.chatroomSlug].members.push(sub.userSlug);
      });

      return nextState;
    }
    case WORKSPACE.CREATE.RECEIVE: {
      const {
        workspace,
        owner,
        chatrooms,
        chatroomSubs,
      } = action.workspace;

      nextState = {};
      chatrooms.forEach((ch) => {
        nextState[ch.slug] = {
          workspaceSlug: workspace.slug,
          members: [owner.slug],
          messages: [],
          subs: chatroomSubs.map(sub => sub.id),
          ...ch
        };
      });

      return nextState;
    }
    case WORKSPACE_SUB.CREATE.RECEIVE: {
      const { user, workspaceSub, chatroomSubs } = action.workspaceSub;

      nextState = {};
      chatroomSubs.forEach((sub) => {
        if (!state[sub.chatroomSlug]) {
          return;
        }

        nextState[sub.chatroomSlug] = {
          ...state[sub.chatroomSlug],
          workspaceSlug: workspaceSub.workspaceSlug,
          members: [...state[sub.chatroomSlug].members, user.slug],
          subs: [...state[sub.chatroomSlug].subs, sub.id],
        };
      });

      return merge({}, state, nextState);
    }
    case UNREAD_UPDATE:
      if (action.unread.readableType !== 'Channel') {
        return state;
      }

      nextState = { [action.unread.slug]: { shouldFetch: true } };

      return merge({}, state, nextState);
    case MESSAGE.INDEX.RECEIVE: {
      const {
        chatroom,
        messages,
        pins,
        members,
      } = action.messages;

      nextState = {};
      nextState[chatroom.slug] = {
        ...chatroom,
        messages: [...state[chatroom.slug].messages],
        pins: pins && pins.map(pin => pin.id),
        members,
        shouldFetch: false,
      };

      messages.filter(msg => (
        !msg.parentMessageSlug && !state[chatroom.slug].messages.includes(msg.slug)
      )).forEach((msg) => {
        nextState[chatroom.slug].messages.push(msg.slug);
      });

      return merge({}, state, nextState);
    }
    case MESSAGE.CREATE.RECEIVE: {
      const { parentMessageSlug, slug, chatroomSlug } = action.message;

      if (parentMessageSlug) {
        return state;
      }

      nextState = { [chatroomSlug]: { messages: [...state[chatroomSlug].messages, slug] } };

      return merge({}, state, nextState);
    }
    case MESSAGE.DESTROY.RECEIVE: {
      const { chatroomSlug, slug } = action.message;

      nextState = merge({}, state);
      nextState[chatroomSlug].messages = state[chatroomSlug].messages.filter(msg => (
        msg.slug !== slug
      ));

      return nextState;
    }
    case SCROLL_LOCATION_UPDATE: {
      const { chatroomSlug, scrollLoc } = action;

      if (chatroomSlug === 'unreads' || chatroomSlug === 'threads') {
        return state;
      }

      nextState = { [chatroomSlug]: { scrollLoc } };

      return merge({}, state, nextState);
    }
    case CHATROOM_SUB.CREATE.RECEIVE: {
      const { id, chatroomSlug, userSlug } = action.chatroomSub;

      nextState = {};
      nextState[chatroomSlug] = {
        subs: [...state[chatroomSlug].subs, id],
        members: [...state[chatroomSlug].members, userSlug],
      };

      return merge({}, state, nextState);
    }
    case CHATROOM_SUB.DESTROY.RECEIVE: {
      const { chatroomSlug, id, userSlug } = action.chatroomSub;

      nextState = {};
      nextState[chatroomSlug] = {
        subs: state[chatroomSlug].subs.filter(val => val !== id),
        members: state[chatroomSlug].members.filter(val => val !== userSlug),
      };

      return merge({}, state, nextState);
    }
    case PIN.CREATE.RECEIVE: {
      const { id, chatroomSlug } = action.pin;
      nextState = { [chatroomSlug]: { pins: [...state[chatroomSlug].pins, id] } };
      return merge({}, state, nextState);
    }
    case PIN.DESTROY.RECEIVE: {
      const { id, chatroomSlug } = action.pin;
      nextState = merge({}, state);
      nextState[chatroomSlug].pins = state[chatroomSlug].pins.filter(pinId => pinId !== id);
      return nextState;
    }
    case WORKSPACE_SUB.CREATE.REQUEST:
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default chatroomReducer;
