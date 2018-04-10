import { RECEIVE_CHANNELS, RECEIVE_CHANNEL } from '../actions/channel_actions';
import { RECEIVE_WORKSPACE } from '../actions/workspace_actions';

const channelReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case RECEIVE_CHANNELS :
      return Object.assign({}, state, action.channels);
    case RECEIVE_CHANNEL :
      const { channel, messages, members } = action.channel;
      channel.messageIds = messages.map(msg => msg.id);
      channel.memberIds = members.map(member => member.id);
      nextState = { [channel.id]: channel };
      return Object.assign({}, state, nextState);
    case RECEIVE_WORKSPACE :
      nextState = action.workspace.channels;
      return Object.assign({}, state, nextState);
    default :
      return state;
  }
};

export default channelReducer;