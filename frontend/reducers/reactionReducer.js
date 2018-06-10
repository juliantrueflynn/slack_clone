import { REACTION, CHANNEL, MESSAGE } from '../actions/actionTypes';

const reactionReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case REACTION.CREATE.RECEIVE: {
      const { reaction } = action;
      nextState = { [reaction.id]: reaction };

      return Object.assign({}, state, nextState);
    }
    case REACTION.DELETE.RECEIVE: {
      const { reaction } = action;
      nextState = Object.assign({}, state);
      delete nextState[reaction.id];

      return nextState;
    }
    case CHANNEL.SHOW.RECEIVE: {
      const { channel: { reactions } } = action;
      nextState = {};
      reactions.map((reaction) => {
        nextState[reaction.id] = reaction;
      });

      return Object.assign({}, state, nextState);
    }
    case MESSAGE.SHOW.RECEIVE: {
      const { message: { reactions } } = action;
      nextState = {};
      reactions.map((reaction) => {
        nextState[reaction.id] = reaction;
      });

      return Object.assign({}, state, nextState);
    }
    default:
      return state;
  }
};

export default reactionReducer;
