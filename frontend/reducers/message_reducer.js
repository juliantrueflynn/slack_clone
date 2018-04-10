import { RECEIVE_CHANNEL } from '../actions/channel_actions';

const messageReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case RECEIVE_CHANNEL :
      nextState = {};
      action.channel.messages.map(message => {
        nextState[message.id] = message;
      });
      return Object.assign({}, state, nextState);
    default :
      return state;
  }
};

export default messageReducer;