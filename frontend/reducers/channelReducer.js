import merge from 'lodash.merge';
import { isDateOlderThanOther } from '../util/dateUtil';
import {
  WORKSPACE,
  CHANNEL,
  READ,
  MESSAGE,
  CHANNEL_SUB,
  WORKSPACE_SUB,
  SIGN_OUT,
  UNREAD,
  CLEAR_UNREADS,
  HISTORY,
  CHANNEL_SWITCH,
  SEARCH
} from '../actions/actionTypes';

const channelReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case CHANNEL.INDEX.RECEIVE: {
      const { channels: { channels, workspaceSlug } } = action;

      nextState = channels.reduce((acc, curr) => {
        acc[curr.slug] = {
          members: [],
          messages: [],
          subs: [],
          workspaceSlug,
          ...curr,
        };

        return acc;
      }, {});

      return merge({}, state, nextState);
    }
    case MESSAGE.INDEX.REQUEST: {
      const { channelSlug } = action;

      nextState = {};
      nextState[channelSlug] = {
        isOpen: true,
        isLoading: true,
        slug: channelSlug,
        subs: [],
        members: [],
        messages: [],
      };

      return merge({}, state, nextState);
    }
    case MESSAGE.INDEX.RECEIVE: {
      const { channel, messages, members } = action.messages;

      nextState = {};
      nextState[channel.slug] = {
        messages: messages.map(msg => msg.slug),
        isLoading: false,
        ...channel,
      };

      members.forEach((memberSlug) => {
        if (!nextState[channel.slug].members) {
          nextState[channel.slug].members = [memberSlug];
          return;
        }

        if (nextState[channel.slug].members.includes(memberSlug)) {
          return;
        }

        nextState[channel.slug].members.push(memberSlug);
      });

      return merge({}, state, nextState);
    }
    case WORKSPACE.SHOW.RECEIVE: {
      const {
        workspace,
        channels,
        channelSubs,
        reads,
        unreads,
      } = action.workspace;

      nextState = {};
      channels.forEach((channel) => {
        nextState[channel.slug] = {
          workspaceSlug: workspace.slug,
          readId: null,
          lastRead: null,
          lastActive: null,
          hasUnreads: false,
          messages: [],
          subs: [],
          members: [],
          ...channel
        };
      });

      channelSubs.forEach((sub) => {
        nextState[sub.channelSlug].subs.push(sub.id);
        nextState[sub.channelSlug].members.push(sub.userSlug);
      });

      reads.forEach((read) => {
        if (read.readableType !== 'Channel') return;
        nextState[read.slug].lastRead = read.accessedAt;
        nextState[read.slug].readId = read.id;
      });

      unreads.forEach((unread) => {
        if (unread.unreadableType !== 'Channel') return;
        nextState[unread.slug].lastActive = unread.activeAt;
        nextState[unread.slug].unreadId = unread.id;
      });

      Object.values(nextState).forEach(({ slug, lastActive, lastRead }) => {
        nextState[slug].hasUnreads = isDateOlderThanOther(lastRead, lastActive);
      });

      return nextState;
    }
    case SEARCH.INDEX.RECEIVE: {
      const { channels } = action.messages;

      nextState = {};
      channels.forEach((channel) => {
        nextState[channel.slug] = channel;
        nextState[channel.slug].messages = [];
        nextState[channel.slug].subs = [];
        nextState[channel.slug].members = [];
      });

      return merge({}, state, nextState);
    }
    case WORKSPACE.CREATE.RECEIVE: {
      const {
        workspace,
        owner,
        channels,
        channelSubs,
      } = action.workspace;
      nextState = Object.assign({}, state);
      channels.forEach((channel) => {
        nextState[channel.slug] = {
          workspaceSlug: workspace.slug,
          members: [owner.slug],
          subs: [],
          ...channel
        };
      });

      channelSubs.forEach((sub) => {
        nextState[sub.channelSlug].subs.push(sub.id);
      });

      return nextState;
    }
    case WORKSPACE_SUB.CREATE.RECEIVE: {
      const { user, workspaceSub: { workspaceSlug }, channelSubs } = action.workspaceSub;

      nextState = {};
      channelSubs.forEach((sub) => {
        nextState[sub.channelSlug] = {
          id: sub.channelId,
          slug: sub.channelSlug,
          workspaceSlug,
          members: [user.slug],
          subs: [sub.id],
          messages: [],
        };
      });

      return merge({}, state, nextState);
    }
    case CHANNEL.CREATE.RECEIVE: {
      const { subs, members, ...channel } = action.channel;

      nextState = Object.assign({}, state);
      nextState[channel.slug] = {
        lastRead: channel.createdAt,
        subs: subs.map(sub => sub.id),
        members,
        ...channel,
      };

      if (channel.ownerSlug) {
        nextState[channel.slug].members.push(channel.ownerSlug);
      }

      return nextState;
    }
    case CHANNEL.UPDATE.RECEIVE: {
      const { channel } = action;
      nextState = {};
      nextState[channel.slug] = channel;
      return merge({}, state, nextState);
    }
    case CHANNEL.DESTROY.RECEIVE:
      nextState = Object.assign({}, state);
      delete nextState[action.channelSlug];
      return nextState;
    case CHANNEL_SUB.CREATE.RECEIVE: {
      const { id, channelSlug, userSlug } = action.channelSub;
      nextState = Object.assign({}, state);
      nextState[channelSlug].subs.push(id);
      nextState[channelSlug].members.push(userSlug);
      return nextState;
    }
    case MESSAGE.CREATE.RECEIVE: {
      const { message } = action.message;
      nextState = {};
      nextState[message.channelSlug] = { messages: [message.slug] };
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
    case HISTORY.INDEX.REQUEST: {
      const { channelSlug, startDate } = action;
      nextState = Object.assign({}, state);
      nextState[channelSlug].lastFetched = startDate;
      return nextState;
    }
    case HISTORY.INDEX.RECEIVE: {
      const { messages: { messages, channel } } = action;

      nextState = Object.assign({}, state);
      messages.forEach((message) => {
        nextState[channel.slug].messages.push(message.slug);
      });

      return nextState;
    }
    case READ.CREATE.RECEIVE:
    case READ.UPDATE.RECEIVE: {
      const { read } = action;
      if (read.readableType !== 'Channel') return state;
      nextState = Object.assign({}, state);
      nextState[read.slug].lastRead = read.accessedAt;
      nextState[read.slug].readId = read.id;

      const lastRead = read.accessedAt;
      const { lastActive } = nextState[read.slug];
      nextState[read.slug].hasUnreads = isDateOlderThanOther(lastRead, lastActive);

      if (nextState[read.slug].isOpen) {
        nextState[read.slug].hasUnreads = false;
      }

      return nextState;
    }
    case UNREAD.CREATE.RECEIVE:
    case UNREAD.UPDATE.RECEIVE: {
      const { unread } = action;
      if (unread.unreadableType !== 'Channel') return state;
      nextState = Object.assign({}, state);
      nextState[unread.slug].unreadId = unread.id;
      const { lastRead } = nextState[unread.slug];
      const lastActive = unread.activeAt;
      nextState[unread.slug].hasUnreads = isDateOlderThanOther(lastRead, lastActive);

      if (nextState[unread.slug].isOpen) {
        nextState[unread.slug].hasUnreads = false;
      }

      return nextState;
    }
    case UNREAD.INDEX.RECEIVE: {
      const { unreads } = action;
      const unreadChannels = Object.values(state).filter(ch => ch.hasUnreads);

      nextState = Object.assign({}, state);
      unreadChannels.forEach((channel) => {
        nextState[channel.slug].messages = [];
      });

      unreads.forEach((message) => {
        nextState[message.channelSlug].messages.push(message.slug);
      });

      return nextState;
    }
    case CLEAR_UNREADS: {
      const { channelSlug, lastRead } = action;
      nextState = Object.assign({}, state);
      nextState[channelSlug].hasUnreads = false;
      nextState[channelSlug].lastRead = lastRead;
      return nextState;
    }
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default channelReducer;
