import { CREATE_REACTION_RECEIVE } from "../actions/reactionActions";
import { MESSAGE_RECEIVE } from "../actions/messageActions";
import { CHANNEL_RECEIVE } from "../actions/channelActions";

const reactionReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case CREATE_REACTION_RECEIVE : {
      const { reaction } = action;
      nextState = { [reaction.id]: reaction };

      return Object.assign({}, state, nextState);
    }
    case MESSAGE_RECEIVE : {
      const { message: { reactions } } = action;
      nextState = {};
      reactions.map(reaction => {
        nextState[reaction.id] = reaction;
      });

      return Object.assign({}, state, nextState);
    }
    case CHANNEL_RECEIVE : {
      const { channel: { reactions } } = action;
      nextState = {};
      reactions.map(reaction => {
        nextState[reaction.id] = reaction;
      });

      return Object.assign({}, state, nextState);
    }
    default :
      return state;
  }
};

export default reactionReducer;