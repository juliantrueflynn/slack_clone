import {
  CHANNEL_RECEIVE,
  UPDATE_CHANNEL_RECEIVE,
  DELETE_CHANNEL_RECEIVE,
  DEFAULT_CHANNELS_RECEIVE
} from '../actions/channel_actions';
import { WORKSPACE_RECEIVE } from '../actions/workspace_actions';

const channelReducer = (state = {}, action) => {
  Object.freeze(state);
  
  let nextState;
  switch (action.type) {
    case CHANNEL_RECEIVE :
      const { channel, messages, members } = action.channel;
      channel.messages = messages.map(message => message.slug);
      channel.members = members.map(member => member.slug);
      nextState = { [channel.slug]: channel };
      return Object.assign({}, state, nextState);
    case WORKSPACE_RECEIVE :
      nextState = {};
      action.workspace.channels.forEach(item => {
        nextState[item.slug] = item;
      });
      return nextState;
    case DEFAULT_CHANNELS_RECEIVE :
      nextState = {};
      action.channels.forEach(item => { nextState[item.slug] = item; });
      return nextState;
    case UPDATE_CHANNEL_RECEIVE :
      nextState = {};
      nextState[action.channel.slug] = action.channel;
      return Object.assign({}, state, nextState);
    case DELETE_CHANNEL_RECEIVE :
      nextState = Object.assign({}, state);
      delete nextState[action.channelSlug];
      return nextState;
    default :
      return state;
  }
};

export default channelReducer;