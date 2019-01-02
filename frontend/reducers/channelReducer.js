import merge from 'lodash.merge';
import {
  WORKSPACE,
  CHANNEL,
  MESSAGE,
  CHANNEL_SUB,
  WORKSPACE_SUB,
  SCROLL_LOCATION_UPDATE,
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
          subs: [],
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
      nextState[channel.slug] = { subs: subs.map(sub => sub.id), members, ...channel };

      if (channel.ownerSlug) {
        nextState[channel.slug].members.push(channel.ownerSlug);
      }

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
      const { channel } = action.messages;

      nextState = { [channel.slug]: { ...channel, ...state[channel.slug] } };

      return merge({}, state, nextState);
    }
    case SCROLL_LOCATION_UPDATE: {
      const { channelSlug, lastFetched, scrollLoc } = action;

      if (channelSlug === 'unreads' || channelSlug === 'threads') {
        return state;
      }

      nextState = { [channelSlug]: { scrollLoc, lastFetched } };

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
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default channelReducer;
