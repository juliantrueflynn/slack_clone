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
import { filterPop } from '../util/reducerUtil';

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
      nextState = Object.assign({}, state);
      nextState[channel.slug].pins = pins.map(pin => pin.id);
      return nextState;
    }
    case CHANNEL.CREATE.RECEIVE: {
      const {
        subs,
        channel,
        workspaceSlug,
        members,
      } = action.channel;

      nextState = Object.assign({}, state);
      nextState[channel.slug] = {
        lastRead: channel.createdAt,
        subs: subs.map(sub => sub.id),
        messages: [],
        pins: [],
        workspaceSlug,
        members,
        ...channel,
      };

      if (channel.ownerSlug) {
        nextState[channel.slug].members.push(channel.ownerSlug);
      }

      return nextState;
    }
    case CHANNEL.UPDATE.RECEIVE:
      nextState = Object.assign({}, state);
      nextState[action.channel.slug].title = action.channel.title;
      nextState[action.channel.slug].topic = action.channel.topic || null;
      return nextState;
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

      nextState = Object.assign({}, state);
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

      nextState = Object.assign({}, state);
      nextState[channel.slug].messages = messages.map(msg => msg.slug);
      nextState[channel.slug].pins = pins.map(pin => pin.id);
      nextState[channel.slug].members = members;
      nextState[channel.slug].isOpen = true;
      nextState[channel.slug].createdAt = channel.createdAt;
      nextState[channel.slug].ownerSlug = channel.ownerSlug || null;
      nextState[channel.slug].topic = channel.topic || null;

      return nextState;
    }
    case MESSAGE.CREATE.RECEIVE: {
      const { channelSlug, ...msg } = action.message;

      nextState = Object.assign({}, state);
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
      nextState = Object.assign({}, state);
      nextState[chSlug].messages = filterPop(nextState[chSlug].messages, slug);
      return nextState;
    }
    case CHANNEL_SWITCH: {
      const { channelSlug, scrollLoc } = action;

      if (channelSlug === 'unreads' || channelSlug === 'threads') {
        return state;
      }

      nextState = Object.assign({}, state);
      nextState[channelSlug].scrollLoc = scrollLoc;
      nextState[channelSlug].isOpen = false;
      return nextState;
    }
    case HISTORY.INDEX.REQUEST:
      nextState = Object.assign({}, state);
      nextState[action.channelSlug].lastFetched = action.startDate;
      return nextState;
    case HISTORY.INDEX.RECEIVE: {
      const { messages, channel } = action.messages;

      nextState = Object.assign({}, state);
      messages.forEach((message) => {
        nextState[channel.slug].messages.push(message.slug);
      });

      return nextState;
    }
    case CHANNEL_SUB.CREATE.RECEIVE: {
      const { id, channelSlug, userSlug } = action.channelSub;
      nextState = Object.assign({}, state);
      nextState[channelSlug].subs.push(id);
      nextState[channelSlug].members.push(userSlug);
      return nextState;
    }
    case CHANNEL_SUB.DESTROY.RECEIVE: {
      const { channelSlug: chSlug, id, userSlug } = action.channelSub;
      nextState = Object.assign({}, state);
      nextState[chSlug].subs = filterPop(nextState[chSlug].subs, id);
      nextState[chSlug].members = filterPop(nextState[chSlug].members, userSlug);
      return nextState;
    }
    case READ.CREATE.RECEIVE:
    case READ.UPDATE.RECEIVE: {
      const { read } = action;

      if (read.readableType !== 'Channel') {
        return state;
      }

      nextState = Object.assign({}, state);
      nextState[read.slug].readId = read.id;
      nextState[read.slug].lastRead = read.accessedAt;
      nextState[read.slug].hasUnreads = false;

      return nextState;
    }
    case READ.INDEX.RECEIVE: {
      const { messages } = action.messages;

      nextState = Object.assign({}, state);
      Object.values(nextState).forEach((channel) => {
        nextState[channel.slug].unreadsLength = 0;
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
      nextState = Object.assign({}, state);
      nextState[action.channelSlug].hasUnreads = false;
      nextState[action.channelSlug].unreadsLength = 0;
      nextState[action.channelSlug].lastRead = action.lastRead;
      return nextState;
    case PIN.CREATE.RECEIVE:
      nextState = Object.assign({}, state);
      nextState[action.pin.channelSlug].pins.push(action.pin.id);
      return nextState;
    case PIN.DESTROY.RECEIVE: {
      const { id, channelSlug: chSlug } = action.pin;
      nextState = Object.assign({}, state);
      nextState[chSlug].pins = filterPop(nextState[chSlug].pins, id);
      return nextState;
    }
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default channelReducer;
