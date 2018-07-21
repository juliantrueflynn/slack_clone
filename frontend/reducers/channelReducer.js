import merge from 'lodash.merge';
import { WORKSPACE, CHANNEL, READ, MESSAGE, USER_UNREADS, DM_CHAT } from '../actions/actionTypes';

const channelReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case CHANNEL.SHOW.RECEIVE: {
      const { channel, messages, ...props } = action.channel;

      channel.messages = messages.map(msg => msg.slug);
      channel.reactions = props.reactions.map(reaction => reaction.id);
      channel.isActive = true;
      nextState = merge({}, state, { [channel.slug]: channel });

      const prevState = Object.assign({}, state);
      Object.keys(prevState).forEach((prevSlug) => {
        if (prevSlug !== channel.slug) nextState[prevSlug].isActive = false;
      });

      props.members.forEach((memberSlug) => {
        if (!nextState[channel.slug].memberSlugs) {
          nextState[channel.slug].memberSlugs = [memberSlug];
          return;
        }

        if (nextState[channel.slug].memberSlugs.includes(memberSlug)) return;

        nextState[channel.slug].memberSlugs.push(memberSlug);
      });

      return nextState;
    }
    case WORKSPACE.SHOW.RECEIVE: {
      const { workspace: { channels } } = action;
      nextState = {};
      channels.forEach((channel) => {
        nextState[channel.slug] = channel;
        nextState[channel.slug].isActive = false;
        // const lastReadInMs = Date.parse(channel.lastRead);
        // const lastActiveInMs = Date.parse(channel.lastActive);
        // nextState[channel.slug].hasUnreads = lastReadInMs < lastActiveInMs;
      });
      return nextState;
    }
    case DM_CHAT.CREATE.RECEIVE: {
      const { dmChat } = action;
      nextState = Object.assign({}, state);
      nextState[dmChat.slug] = dmChat;
      nextState[dmChat.slug].hasUnreads = false;
      nextState[dmChat.slug].lastActive = dmChat.createdAt;
      nextState[dmChat.slug].lastRead = dmChat.createdAt;
      return Object.assign({}, state, nextState);
    }
    case CHANNEL.CREATE.RECEIVE: {
      const { channel } = action;
      nextState = Object.assign({}, state);
      nextState[channel.slug] = channel;
      nextState[channel.slug].hasUnreads = false;
      if (channel.ownerId) nextState[channel.slug].memberSlugs = [channel.ownerSlug];
      nextState[channel.slug].lastActive = channel.createdAt;
      nextState[channel.slug].lastRead = channel.createdAt;
      return Object.assign({}, state, nextState);
    }
    case CHANNEL.UPDATE.RECEIVE:
      nextState = {};
      nextState[action.channel.slug] = action.channel;
      return Object.assign({}, state, nextState);
    case CHANNEL.DESTROY.RECEIVE:
      nextState = Object.assign({}, state);
      delete nextState[action.channelSlug];
      return nextState;
    case MESSAGE.CREATE.RECEIVE: {
      const { createdAt, channelSlug } = action.message;
      nextState = Object.assign({}, state);
      nextState[channelSlug].lastActive = createdAt;
      nextState[channelSlug].hasUnreads = true;
      if (nextState[channelSlug].isActive) nextState[channelSlug].hasUnreads = false;
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
    case USER_UNREADS.INDEX.RECEIVE: {
      const { channels, messages } = action.unreads;

      nextState = Object.assign({}, state);
      channels.forEach((slug) => {
        const messageSlugs = messages.filter(msg => msg.channelSlug === slug).map(msg => msg.slug);
        nextState[slug].messages = messageSlugs;
      });

      return nextState;
    }
    default:
      return state;
  }
};

export default channelReducer;
