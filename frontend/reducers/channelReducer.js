import merge from 'lodash.merge';
import { WORKSPACE, CHANNEL, READ, MESSAGE } from '../actions/actionTypes';

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

      return nextState;
    }
    case WORKSPACE.SHOW.RECEIVE: {
      const { workspace: { channels } } = action;
      nextState = {};
      channels.forEach((channel) => {
        nextState[channel.slug] = channel;
        const lastReadInMs = Date.parse(channel.lastRead);
        const lastActiveInMs = Date.parse(channel.lastActive);
        nextState[channel.slug].isActive = false;
        nextState[channel.slug].hasUnreads = lastReadInMs < lastActiveInMs;
      });
      return nextState;
    }
    case CHANNEL.CREATE.RECEIVE: {
      const { channel } = action;
      nextState = { [channel.slug]: channel };
      nextState[channel.slug].hasUnreads = false;
      nextState[channel.slug].lastActive = channel.createdAt;
      nextState[channel.slug].lastRead = channel.createdAt;
      return Object.assign({}, state, nextState);
    }
    case CHANNEL.UPDATE.RECEIVE:
      nextState = {};
      nextState[action.channel.slug] = action.channel;
      return Object.assign({}, state, nextState);
    case CHANNEL.DELETE.RECEIVE:
      nextState = Object.assign({}, state);
      delete nextState[action.channelSlug];
      return nextState;
    case MESSAGE.CREATE.RECEIVE: {
      const { message: { createdAt }, channelSlug } = action;
      nextState = Object.assign({}, state);
      nextState[channelSlug].lastActive = createdAt;
      nextState[channelSlug].hasUnreads = true;
      if (nextState[channelSlug].isActive) nextState[channelSlug].hasUnreads = false;
      return nextState;
    }
    case READ.UPDATE.RECEIVE: {
      const { read: { readableType, slug, accessedAt } } = action;
      if (readableType !== 'Channel') return state;
      nextState = Object.assign({}, state);
      nextState[slug].lastRead = accessedAt;
      if (nextState[slug].hasUnreads) nextState[slug].hasUnreads = false;
      return nextState;
    }
    default:
      return state;
  }
};

export default channelReducer;
