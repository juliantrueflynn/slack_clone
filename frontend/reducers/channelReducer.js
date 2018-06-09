import {
  WORKSPACE,
  CHANNEL,
  CREATE_CHANNEL,
  UPDATE_CHANNEL,
  DELETE_CHANNEL,
} from '../actions/actionTypes';

const channelReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case CHANNEL.RECEIVE: {
      const { channel, messages, members, reactions } = action.channel;
      channel.messages = messages.map(message => message.slug);
      channel.members = members.map(member => member.slug);
      channel.reactions = reactions.map(reaction => reaction.id);
      nextState = { [channel.slug]: channel };

      return Object.assign({}, state, nextState);
    }
    case WORKSPACE.RECEIVE:
      nextState = {};
      action.workspace.channels.forEach((item) => {
        nextState[item.slug] = item;
      });
      return nextState;
    case CREATE_CHANNEL.RECEIVE: {
      const { channel } = action;
      nextState = { [channel.slug]: channel };

      return Object.assign({}, state, nextState);
    }
    case UPDATE_CHANNEL.RECEIVE:
      nextState = {};
      nextState[action.channel.slug] = action.channel;
      return Object.assign({}, state, nextState);
    case DELETE_CHANNEL.RECEIVE:
      nextState = Object.assign({}, state);
      delete nextState[action.channelSlug];
      return nextState;
    default:
      return state;
  }
};

export default channelReducer;
