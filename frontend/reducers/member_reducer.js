import { CHANNEL_RECEIVE } from '../actions/channel_actions';

const memberReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case CHANNEL_RECEIVE :
      nextState = {};
      action.channel.members.map(member => {
        nextState[member.slug] = member;
      });
      return nextState;
    default :
      return state;
  }
};

export default memberReducer;