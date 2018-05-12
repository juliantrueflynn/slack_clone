import {
  RECEIVE_CHANNEL,
  DELETE_CHANNEL,
  EDIT_CHANNEL_SUCCESS,
  RECEIVE_DEFAULT_CHANNELS
} from '../actions/channel_actions';
import { RECEIVE_WORKSPACE } from '../actions/workspace_actions';

const channelReducer = (state = {}, action) => {
  Object.freeze(state);
  
  let nextState;
  switch (action.type) {
    case RECEIVE_CHANNEL :
      const { channel, messages, members } = action.channel;
      channel.messages = messages.map(message => message.slug);
      channel.members = members.map(member => member.slug);
      nextState = { [channel.slug]: channel };
      return Object.assign({}, state, nextState);
    case RECEIVE_WORKSPACE :
      nextState = {};
      action.workspace.channels.forEach(item => {
        nextState[item.slug] = item;
      });
      return nextState;
    case RECEIVE_DEFAULT_CHANNELS :
      nextState = {};
      action.channels.forEach(item => { nextState[item.slug] = item; });
      return nextState;
    case EDIT_CHANNEL_SUCCESS :
      nextState = {};
      nextState[action.channel.slug] = action.channel;
      return Object.assign({}, state, nextState);
    case DELETE_CHANNEL :
      nextState = Object.assign({}, state);
      delete nextState[action.channelSlug];
      return nextState;
    default :
      return state;
  }
};

export default channelReducer;