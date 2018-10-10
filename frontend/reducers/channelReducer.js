import merge from 'lodash.merge';
import { isDateOlderThanOther } from '../util/dateUtil';
import {
  WORKSPACE,
  CHANNEL,
  READ,
  MESSAGE,
  DM_CHAT,
  CHANNEL_SUB,
  WORKSPACE_SUB,
  SIGN_OUT,
  UNREAD,
  CLEAR_UNREADS,
  LOAD_CHAT_PAGE,
  HISTORY,
  CHANNEL_SWITCH
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
    case LOAD_CHAT_PAGE: {
      const { pagePath } = action;

      if (pagePath === 'unreads' || pagePath === 'threads') {
        return state;
      }

      nextState = {};
      nextState[pagePath] = {
        isOpen: true,
        isLoading: true,
        slug: pagePath,
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
        subs,
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

      subs.forEach((sub) => {
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
      const { user, channelSubs } = action.workspaceSub;

      nextState = Object.assign({}, state);
      channelSubs.forEach((sub) => {
        if (!nextState[sub.channelSlug]) {
          nextState[sub.channelSlug] = {
            id: sub.channelId,
            slug: sub.channelSlug,
            members: [],
            subs: [],
          };
        }

        nextState[sub.channelSlug].members.push(user.slug);
        nextState[sub.channelSlug].subs.push(user.slug);
      });

      return nextState;
    }
    case DM_CHAT.CREATE.RECEIVE: {
      const { dmChat: { channel, subs, members } } = action;

      nextState = Object.assign({}, state);
      nextState[channel.slug] = {
        hasUnreads: false,
        lastRead: channel.createdAt,
        lastActive: null,
        messages: [],
        subs: subs.reduce((acc, curr) => {
          acc.push(curr.id);
          return acc;
        }, []),
        members: members.reduce((acc, curr) => {
          acc.push(curr);
          return acc;
        }, []),
        ...channel,
      };

      return nextState;
    }
    case CHANNEL.CREATE.RECEIVE: {
      const { channel: { subs, ...channel } } = action;

      nextState = Object.assign({}, state);
      nextState[channel.slug] = {
        hasUnreads: false,
        lastActive: null,
        lastRead: channel.createdAt,
        members: [channel.ownerSlug],
        subs: [subs[0].id],
        ...channel,
      };

      return nextState;
    }
    case CHANNEL.UPDATE.RECEIVE:
      nextState = {};
      nextState[action.channel.slug] = action.channel;
      return Object.assign({}, state, nextState);
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
      nextState = Object.assign({}, state);
      nextState[message.channelSlug].messages.push(message.slug);
      return nextState;
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
    case READ.INDEX.RECEIVE: {
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
