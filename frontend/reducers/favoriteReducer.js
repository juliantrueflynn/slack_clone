import merge from 'lodash.merge';
import {
  FAVORITE,
  MESSAGE,
  SIGN_OUT,
  WORKSPACE,
  WORKSPACE_SUB,
} from '../actions/actionTypes';

const favoriteReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case FAVORITE.INDEX.RECEIVE:
    case MESSAGE.INDEX.RECEIVE: {
      const { favorites } = action.messages;
      nextState = favorites.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
      return merge({}, state, nextState);
    }
    case FAVORITE.CREATE.RECEIVE: {
      const { favorite } = action;
      nextState = { [favorite.id]: favorite };
      return merge({}, state, nextState);
    }
    case FAVORITE.DESTROY.RECEIVE: {
      const { favorite } = action;
      nextState = merge({}, state);
      delete nextState[favorite.id];
      return nextState;
    }
    case WORKSPACE_SUB.CREATE.REQUEST:
    case WORKSPACE.SHOW.REQUEST:
    case SIGN_OUT.RECEIVE:
      return {};
    default:
      return state;
  }
};

export default favoriteReducer;
