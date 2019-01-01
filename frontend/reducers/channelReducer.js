import merge from 'lodash.merge';
import {
  WORKSPACE,
  CHANNEL,
  MESSAGE,
  CHANNEL_SUB,
  WORKSPACE_SUB,
  HISTORY,
  SCROLL_LOCATION_UPDATE,
  PIN,
  SIGN_OUT,
} from '../actions/actionTypes';

const channelReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case CHANNEL.INDEX.RECEIVE: {
      const { channels, workspaceSlug } = action.channels;

      nextState = channels.reduce((acc, curr) => {
        acc[curr.slug] = {
          members: [],
          messages: [],
          subs: [],
          pins: [],
          workspaceSlug,
          ...curr,
        };

        return acc;
      }, {});

      return merge({}, state, nextState);
    }
    case CHANNEL.SHOW.RECEIVE: {
      const { channel, pins } = action.channel;
      nextState = {};
      nextState[channel.slug] = { pins: pins.map(pin => pin.id) };

      return merge({}, state, nextState);
    }
    case CHANNEL.CREATE.RECEIVE: {
      const { subs, channel, members } = action.channel;

      nextState = {};
      nextState[channel.slug] = {
        subs: subs.map(sub => sub.id),
        messages: [],
        pins: [],
        members,
        ...channel,
      };

      if (channel.ownerSlug) {
        nextState[channel.slug].members.push(channel.ownerSlug);
      }

      return merge({}, state, nextState);
    }
    case CHANNEL.UPDATE.RECEIVE:
      nextState = {};
      nextState[action.channel.slug] = {
        title: action.channel.title,
        topic: action.channel.topic || null,
      };

      return merge({}, state, nextState);
    case WORKSPACE.SHOW.RECEIVE: {
      const { workspace, channels, channelSubs } = action.workspace;

      nextState = {};
      channels.forEach((channel) => {
        nextState[channel.slug] = {
          workspaceSlug: workspace.slug,
          messages: [],
          subs: [],
          members: [],
          pins: [],
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
          subs: channelSubs.map(sub => sub.id),
          pins: [],
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
    case MESSAGE.INDEX.RECEIVE: {
      const {
        channel,
        messages,
        members,
        pins,
      } = action.messages;

      nextState = {};
      nextState[channel.slug] = {
        ...channel,
        ...state[channel.slug],
        messages: messages.filter(msg => !msg.parentMessageId).map(msg => msg.slug),
        pins: pins.map(pin => pin.id),
        members,
      };

      return merge({}, state, nextState);
    }
    case MESSAGE.CREATE.RECEIVE: {
      const { channelSlug, parentMessageId, slug } = action.message;

      if (parentMessageId) {
        return state;
      }

      nextState = {};

      if (!state[channelSlug].messages.includes(slug)) {
        nextState[channelSlug] = { messages: [...state[channelSlug].messages, slug] };
      }

      return merge({}, state, nextState);
    }
    case MESSAGE.DESTROY.RECEIVE: {
      const { slug, parentMessageId, channelSlug: chSlug } = action.message;

      if (parentMessageId) {
        return state;
      }

      nextState = {};
      nextState[chSlug] = { messages: state[chSlug].messages.filter(val => val !== slug) };

      return merge({}, state, nextState);
    }
    case SCROLL_LOCATION_UPDATE: {
      const { channelSlug, scrollLoc } = action;

      if (channelSlug === 'unreads' || channelSlug === 'threads') {
        return state;
      }

      nextState = {};
      nextState[channelSlug] = { scrollLoc };

      return merge({}, state, nextState);
    }
    case HISTORY.INDEX.REQUEST:
      nextState = {};
      nextState[action.channelSlug] = { lastFetched: action.startDate };
      return merge({}, state, nextState);
    case HISTORY.INDEX.RECEIVE: {
      const { messages, channel } = action.messages;

      nextState = merge({}, state);
      messages.filter(msg => !msg.parentMessageId).forEach(({ slug }) => {
        nextState[channel.slug].messages.push(slug);
      });

      return nextState;
    }
    case CHANNEL_SUB.CREATE.RECEIVE: {
      const { id, channelSlug, userSlug } = action.channelSub;

      nextState = { ...state };
      nextState[channelSlug] = {
        ...state[channelSlug],
        subs: [...state[channelSlug].subs, id],
        members: [...state[channelSlug].members, userSlug],
      };

      return nextState;
    }
    case CHANNEL_SUB.DESTROY.RECEIVE: {
      const { channelSlug, id, userSlug } = action.channelSub;

      nextState = { ...state };
      nextState[channelSlug] = {
        ...state[channelSlug],
        subs: state[channelSlug].subs.filter(val => val !== id),
        members: state[channelSlug].members.filter(val => val !== userSlug),
      };

      return nextState;
    }
    case PIN.CREATE.RECEIVE:
      nextState = merge({}, state);
      nextState[action.pin.channelSlug].pins.push(action.pin.id);
      return nextState;
    case PIN.DESTROY.RECEIVE: {
      const { id, channelSlug: chSlug } = action.pin;
      nextState = merge({}, state);
      nextState[chSlug].pins = state[chSlug].pins.filter(val => val !== id);
      return nextState;
    }
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default channelReducer;
