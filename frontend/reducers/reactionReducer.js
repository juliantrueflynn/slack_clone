import {
  CREATE_REACTION,
  DELETE_REACTION,
  CHANNEL,
  MESSAGE,
} from '../actions/actionTypes';

const reactionReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case CREATE_REACTION.RECEIVE: {
      const { reaction } = action;
      nextState = { [reaction.id]: reaction };

      return Object.assign({}, state, nextState);
    }
    case DELETE_REACTION.RECEIVE: {
      const { reaction } = action;
      nextState = Object.assign({}, state);
      delete nextState[reaction.id];

      return nextState;
    }
    case CHANNEL.RECEIVE: {
      const { channel: { reactions } } = action;
      nextState = {};
      reactions.map((reaction) => {
        nextState[reaction.id] = reaction;
      });

      return Object.assign({}, state, nextState);
    }
    case MESSAGE.RECEIVE: {
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
