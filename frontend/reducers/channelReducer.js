import merge from 'lodash.merge';
import {
  WORKSPACE,
  CHANNEL,
  READ,
  MESSAGE,
  DM_CHAT,
  CHANNEL_SUB
} from '../actions/actionTypes';

const channelReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case CHANNEL.INDEX.RECEIVE: {
      const { channels: { channels, workspaceSlug } } = action;

      nextState = channels.reduce((acc, curr) => {
        acc[curr.slug] = curr;
        acc[curr.slug].workspaceSlug = workspaceSlug;
        return acc;
      }, {});

      return merge({}, state, nextState);
    }
    case MESSAGE.INDEX.RECEIVE: {
      const {
        channel,
        messages,
        members,
        reactions,
      } = action.messages;

      const currChannel = {
        [channel.slug]: {
          isActive: true,
          reactions: reactions.map(reaction => reaction.id),
          messages: messages.map(msg => msg.slug),
          ...channel,
        }
      };

      nextState = merge({}, state, currChannel);

      Object.keys(nextState).forEach((prevSlug) => {
        if (prevSlug !== channel.slug) nextState[prevSlug].isActive = false;
      });

      members.forEach((memberSlug) => {
        if (!nextState[channel.slug].members) {
          nextState[channel.slug].members = [memberSlug];
          return;
        }

        if (nextState[channel.slug].members.includes(memberSlug)) return;

        nextState[channel.slug].members.push(memberSlug);
      });

      return nextState;
    }
    case WORKSPACE.SHOW.RECEIVE: {
      const {
        workspace,
        channels,
        subs,
        messages,
        reads,
      } = action.workspace;

      nextState = {};
      channels.forEach((channel) => {
        nextState[channel.slug] = {
          workspaceSlug: workspace.slug,
          isActive: false,
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
        if (!nextState[sub.channelSlug]) return;
        nextState[sub.channelSlug].subs.push(sub.id);
        nextState[sub.channelSlug].members.push(sub.userSlug);
      });

      reads.forEach((read) => {
        if (read.readableType !== 'Channel') return;
        nextState[read.slug].lastRead = read.accessedAt;
        nextState[read.slug].readId = read.id;
      });

      messages.forEach((message) => {
        if (!nextState[message.channelSlug]) return;
        nextState[message.channelSlug].messages.push(message.slug);
        nextState[message.channelSlug].lastActive = message.createdAt;
        const lastRead = Date.parse(nextState[message.channelSlug].lastRead);
        const lastActive = Date.parse(message.createdAt);
        nextState[message.channelSlug].hasUnreads = lastRead < lastActive;
      });

      return nextState;
    }
    case WORKSPACE.CREATE.RECEIVE: {
      const { channels } = action.workspace;
      nextState = Object.assign({}, state);
      channels.forEach((channel) => { nextState[channel.slug] = channel; });
      return nextState;
    }
    case DM_CHAT.CREATE.RECEIVE: {
      const { dmChat: { channel, subs, members } } = action;

      nextState = Object.assign({}, state);
      nextState[channel.slug] = {
        hasUnreads: false,
        lastRead: channel.createdAt,
        lastActive: channel.createdAt,
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
        lastActive: channel.createdAt,
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
      const { channelSub: { id, channelSlug } } = action;
      nextState = Object.assign({}, state);
      nextState[channelSlug].subs.push(id);
      return nextState;
    }
    case MESSAGE.CREATE.RECEIVE: {
      const { message } = action;
      nextState = Object.assign({}, state);

      if (message.parentMessageId) {
        nextState[message.channelSlug].messages.push(message.slug);
      }

      // nextState[message.channelSlug].lastActive = message.createdAt;
      // nextState[message.channelSlug].hasUnreads = true;
      // if (nextState[message.channelSlug].isActive) {
      //   nextState[message.channelSlug].hasUnreads = false;
      // }

      return nextState;
    }
    case READ.UPDATE.RECEIVE: {
      const { readableType, slug, accessedAt } = action.read;
      if (readableType !== 'Channel') return state;
      nextState = Object.assign({}, state);
      nextState[slug].lastRead = accessedAt;
      if (nextState[slug].hasUnreads) nextState[slug].hasUnreads = false;
      return nextState;
    }
    case READ.INDEX.RECEIVE: {
      const { unreads } = action;

      if (!unreads) return state;

      nextState = Object.assign({}, state);
      return unreads.reduce((acc, curr) => {
        acc[curr.channelSlug].hasUnreads = true;
        acc[curr.channelSlug].messages.push(curr.slug);
        return acc;
      }, nextState);
    }
    default:
      return state;
  }
};

export default channelReducer;
