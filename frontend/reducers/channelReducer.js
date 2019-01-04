import merge from 'lodash.merge';
import {
  WORKSPACE,
  CHANNEL,
  MESSAGE,
  CHANNEL_SUB,
  WORKSPACE_SUB,
  SCROLL_LOCATION_UPDATE,
  SIGN_OUT,
  CREATE_UNREAD,
  HISTORY,
  PIN,
} from '../actions/actionTypes';

const channelReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case CHANNEL.INDEX.RECEIVE: {
      const { channels } = action.channels;

      nextState = channels.reduce((acc, curr) => {
        acc[curr.slug] = curr;

        return acc;
      }, {});

      return merge({}, state, nextState);
    }
    case CHANNEL.CREATE.RECEIVE: {
      const { channel, subs, members } = action.channel;

      nextState = {};
      nextState[channel.slug] = {
        subs: subs.map(sub => sub.id),
        members: channel.hasDm ? members : [channel.ownerSlug],
        messages: [],
        pins: [],
        shouldFetch: true,
        ...channel,
      };

      return merge({}, state, nextState);
    }
    case CHANNEL.UPDATE.RECEIVE:
      nextState = {};
      nextState[action.channel.slug] = {
        title: action.channel.title,
        topic: action.channel.topic,
      };

      return merge({}, state, nextState);
    case WORKSPACE.SHOW.RECEIVE: {
      const { workspace, channels, channelSubs } = action.workspace;

      nextState = {};
      channels.forEach((channel) => {
        nextState[channel.slug] = {
          workspaceSlug: workspace.slug,
          subs: [],
          members: [],
          messages: [],
          pins: [],
          shouldFetch: true,
          ...channel
        };
      });

      channelSubs.forEach((sub) => {
        nextState[sub.channelSlug].subs.push(sub.id);
        nextState[sub.channelSlug].members.push(sub.userSlug);
      });

      return nextState;
    }
    case WORKSPACE.CREATE.RECEIVE: {
      const {
        workspace,
        owner,
        channels,
        channelSubs,
      } = action.workspace;

      nextState = {};
      channels.forEach((ch) => {
        nextState[ch.slug] = {
          workspaceSlug: workspace.slug,
          members: [owner.slug],
          messages: [],
          subs: channelSubs.map(sub => sub.id),
          ...ch
        };
      });

      return nextState;
    }
    case WORKSPACE_SUB.CREATE.RECEIVE: {
      const { user, workspaceSub, channelSubs } = action.workspaceSub;

      nextState = {};
      channelSubs.forEach((sub) => {
        if (!state[sub.channelSlug]) {
          return;
        }

        nextState[sub.channelSlug] = {
          ...state[sub.channelSlug],
          workspaceSlug: workspaceSub.workspaceSlug,
          members: [...state[sub.channelSlug].members, user.slug],
          subs: [...state[sub.channelSlug].subs, sub.id],
        };
      });

      return merge({}, state, nextState);
    }
    case CREATE_UNREAD:
      if (action.unread.readableType !== 'Channel') {
        return state;
      }

      nextState = { [action.unread.slug]: { shouldFetch: true } };

      return merge({}, state, nextState);
    case HISTORY.INDEX.RECEIVE:
    case MESSAGE.INDEX.RECEIVE: {
      const { channel, messages, pins } = action.messages;

      nextState = {};
      nextState[channel.slug] = {
        ...channel,
        messages: [...state[channel.slug].messages],
        pins: pins && pins.map(pin => pin.id),
        shouldFetch: false,
      };

      messages.filter(msg => !msg.parentMessageSlug).forEach((msg) => {
        if (!state[channel.slug].messages.includes(msg.slug)) {
          nextState[channel.slug].messages.push(msg.slug);
        }
      });

      return merge({}, state, nextState);
    }
    case MESSAGE.CREATE.RECEIVE: {
      const { parentMessageSlug, slug, channelSlug } = action.message.message;

      if (parentMessageSlug) {
        return state;
      }

      nextState = { [channelSlug]: { messages: [...state[channelSlug].messages, slug] } };

      return merge({}, state, nextState);
    }
    case MESSAGE.DESTROY.RECEIVE: {
      const { channelSlug, slug } = action.message;

      nextState = {};
      nextState[channelSlug] = {
        messages: state[channelSlug].messages.filter(msg => msg.slug !== slug)
      };

      return merge({}, state, nextState);
    }
    case SCROLL_LOCATION_UPDATE: {
      const { channelSlug, scrollLoc } = action;

      if (channelSlug === 'unreads' || channelSlug === 'threads') {
        return state;
      }

      nextState = { [channelSlug]: { scrollLoc } };

      return merge({}, state, nextState);
    }
    case CHANNEL_SUB.CREATE.RECEIVE: {
      const { id, channelSlug, userSlug } = action.channelSub;

      nextState = {};
      nextState[channelSlug] = {
        subs: [...state[channelSlug].subs, id],
        members: [...state[channelSlug].members, userSlug],
      };

      return merge({}, state, nextState);
    }
    case CHANNEL_SUB.DESTROY.RECEIVE: {
      const { channelSlug, id, userSlug } = action.channelSub;

      nextState = {};
      nextState[channelSlug] = {
        subs: state[channelSlug].subs.filter(val => val !== id),
        members: state[channelSlug].members.filter(val => val !== userSlug),
      };

      return merge({}, state, nextState);
    }
    case PIN.CREATE.RECEIVE: {
      const { id, channelSlug } = action.pin;

      nextState = {};
      nextState[channelSlug] = { pins: [...state[channelSlug].pins, id] };

      return merge({}, state, nextState);
    }
    case PIN.DESTROY.RECEIVE: {
      const { id, channelSlug } = action.pin;

      nextState = merge({}, state);
      nextState[channelSlug].pins = state[channelSlug].pins.filter(pinId => pinId !== id);

      return nextState;
    }
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default channelReducer;
