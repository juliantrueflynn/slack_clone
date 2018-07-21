import merge from 'lodash.merge';
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
    case REACTION.DESTROY.RECEIVE: {
      const { reaction } = action;
      nextState = Object.assign({}, state);
      delete nextState[reaction.id];
      return nextState;
    }
    case CHANNEL.SHOW.RECEIVE: {
      nextState = action.channel.reactions.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});
      return merge({}, state, nextState);
    }
    case MESSAGE.SHOW.RECEIVE: {
      const { message: { reactions } } = action;
      nextState = {};
      reactions.forEach((reaction) => { nextState[reaction.id] = reaction; });
      return Object.assign({}, state, nextState);
    }
    default:
      return state;
  }
};

export default reactionReducer;
