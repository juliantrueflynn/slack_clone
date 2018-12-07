import merge from 'lodash.merge';
import {
  REACTION,
  MESSAGE,
  READ,
  USER_THREAD,
  HISTORY,
  SEARCH,
  FAVORITE,
  WORKSPACE,
  SIGN_OUT,
} from '../actions/actionTypes';

const reactionReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case REACTION.CREATE.RECEIVE: {
      const { reaction } = action;
      nextState = {};
      nextState[reaction.id] = reaction;
      return merge({}, state, nextState);
    }
    case REACTION.DESTROY.RECEIVE: {
      const { reaction } = action;
      nextState = merge({}, state);
      delete nextState[reaction.id];
      return nextState;
    }
    case FAVORITE.INDEX.RECEIVE:
    case SEARCH.INDEX.RECEIVE:
    case HISTORY.INDEX.RECEIVE:
    case READ.INDEX.RECEIVE:
    case USER_THREAD.INDEX.RECEIVE:
    case MESSAGE.INDEX.RECEIVE:
    case MESSAGE.SHOW.RECEIVE: {
      const { reactions } = action.messages;

      nextState = {};
      reactions.forEach((reaction) => {
        nextState[reaction.id] = reaction;
      });

      return merge({}, state, nextState);
    }
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default reactionReducer;
