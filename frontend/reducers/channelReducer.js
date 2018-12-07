import merge from 'lodash.merge';
import { isDateOlderThanOther } from '../util/dateUtil';
import {
  WORKSPACE,
  CHANNEL,
  READ,
  MESSAGE,
  CHANNEL_SUB,
  WORKSPACE_SUB,
  CLEAR_UNREADS,
  HISTORY,
  CHANNEL_SWITCH,
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
        lastRead: channel.createdAt,
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
      const {
        workspace,
        channels,
        channelSubs,
        reads,
        messages,
      } = action.workspace;

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

      reads.filter(read => read.readableType === 'Channel').forEach((read) => {
        nextState[read.slug].lastRead = read.accessedAt;
        nextState[read.slug].readId = read.id;
      });

      messages.filter(msg => !msg.parentMessageId).forEach((msg) => {
        nextState[msg.channelSlug].lastActive = msg.createdAt;
      });

      Object.values(nextState).forEach(({ slug, lastActive, lastRead }) => {
        nextState[slug].hasUnreads = isDateOlderThanOther(lastRead, lastActive);
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
        nextState[sub.channelSlug] = {
          workspaceSlug: workspaceSub.workspaceSlug,
          id: sub.channelId,
          slug: sub.channelSlug,
          members: [user.slug],
          subs: [sub.id],
          messages: [],
          pins: [],
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
        messages: messages.map(msg => msg.slug),
        pins: pins.map(pin => pin.id),
        members,
        isOpen: true,
      };

      return merge({}, state, nextState);
    }
    case MESSAGE.CREATE.RECEIVE: {
      const { channelSlug, ...msg } = action.message;

      nextState = merge({}, state);
      nextState[channelSlug].messages.push(msg.slug);

      if (msg.parentMessageId) {
        return nextState;
      }

      nextState[channelSlug].lastActive = msg.createdAt;
      const { lastRead, isOpen } = nextState[channelSlug];

      if (!isOpen || msg.entityType !== 'entry') {
        nextState[channelSlug].hasUnreads = isDateOlderThanOther(lastRead, msg.createdAt);
      }

      return nextState;
    }
    case MESSAGE.DESTROY.RECEIVE: {
      const { slug, channelSlug: chSlug } = action.message;
      nextState = {};
      nextState[chSlug] = { messages: state[chSlug].messages.filter(val => val !== slug) };
      return merge({}, state, nextState);
    }
    case CHANNEL_SWITCH: {
      const { channelSlug, scrollLoc } = action;

      if (channelSlug === 'unreads' || channelSlug === 'threads') {
        return state;
      }

      nextState = {};
      nextState[channelSlug] = { scrollLoc, isOpen: false };
      return merge({}, state, nextState);
    }
    case HISTORY.INDEX.REQUEST:
      nextState = {};
      nextState[action.channelSlug] = { lastFetched: action.startDate };
      return merge({}, state, nextState);
    case HISTORY.INDEX.RECEIVE: {
      const { messages, channel } = action.messages;

      nextState = merge({}, state);
      messages.forEach(({ slug }) => {
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
    case READ.CREATE.RECEIVE:
    case READ.UPDATE.RECEIVE:
      if (action.read.readableType !== 'Channel') {
        return state;
      }

      nextState = {};
      nextState[action.read.slug] = {
        readId: action.read.id,
        lastRead: action.read.accessedAt,
      };

      return merge({}, state, nextState);
    case READ.INDEX.RECEIVE: {
      const { messages } = action.messages;

      nextState = merge({}, state);
      Object.keys(state).forEach((slug) => {
        nextState[slug].unreadsLength = 0;
      });

      messages.forEach(({ channelSlug, slug }) => {
        nextState[channelSlug].unreadsLength += 1;

        if (!nextState[channelSlug].messages.includes(slug)) {
          nextState[channelSlug].messages.push(slug);
        }
      });

      return nextState;
    }
    case CLEAR_UNREADS:
      nextState = {};
      nextState[action.channelSlug] = {
        hasUnreads: false,
        unreadsLength: 0,
        lastRead: action.lastRead,
      };

      return merge({}, state, nextState);
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
