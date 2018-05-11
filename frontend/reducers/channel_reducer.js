import {
  RECEIVE_CHANNEL, DELETE_CHANNEL, CREATE_CHANNELS_SUCCESS, EDIT_CHANNEL_SUCCESS
} from '../actions/channel_actions';
import { RECEIVE_WORKSPACE } from '../actions/workspace_actions';

const channelReducer = (state = {}, action) => {
  Object.freeze(state);
  
  let nextState;
  switch (action.type) {
    case RECEIVE_CHANNEL :
      const { channel, messages, members } = action.channel;
      channel.messageIds = messages.map(message => message.slug);
      channel.memberIds = members.map(member => member.id);
      nextState = { [channel.slug]: channel };
      return Object.assign({}, state, nextState);
    case RECEIVE_WORKSPACE :
      nextState = {};
      action.workspace.channels.forEach(item => {
        nextState[item.slug] = item;
      });
      return nextState;
    case CREATE_CHANNELS_SUCCESS :
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