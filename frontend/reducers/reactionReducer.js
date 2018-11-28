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
      nextState = Object.assign({}, state);
      nextState[reaction.id] = reaction;
      return nextState;
    }
    case REACTION.DESTROY.RECEIVE: {
      const { reaction } = action;
      nextState = Object.assign({}, state);
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

      nextState = Object.assign({}, state);
      reactions.forEach((reaction) => {
        nextState[reaction.id] = reaction;
      });

      return nextState;
    }
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default reactionReducer;
