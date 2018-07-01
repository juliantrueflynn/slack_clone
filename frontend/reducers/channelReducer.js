import { WORKSPACE, CHANNEL } from '../actions/actionTypes';

const channelReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case CHANNEL.SHOW.RECEIVE: {
      const { channel, messages, reactions } = action.channel;
      channel.messages = messages.map(message => message.slug);
      channel.reactions = reactions.map(reaction => reaction.id);
      nextState = { [channel.slug]: channel };

      return Object.assign({}, state, nextState);
    }
    case WORKSPACE.SHOW.RECEIVE:
      nextState = {};
      action.workspace.channels.forEach((item) => {
        nextState[item.slug] = item;
      });
      return nextState;
    case CHANNEL.CREATE.RECEIVE: {
      const { channel } = action;
      nextState = { [channel.slug]: channel };

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
    default:
      return state;
  }
};

export default channelReducer;
