import { FAVORITE, CHANNEL } from '../actions/actionTypes';

const favoriteReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case FAVORITE.INDEX.RECEIVE: {
      const { favorites } = action;

      return favorites.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});
    }
    case FAVORITE.CREATE.RECEIVE: {
      const { favorite } = action;
      nextState = { [favorite.id]: favorite };
      return Object.assign({}, state, nextState);
    }
    case FAVORITE.DESTROY.RECEIVE: {
      const { favorite } = action;
      nextState = Object.assign({}, state);
      delete nextState[favorite.id];
      return nextState;
    }
    case CHANNEL.SHOW.RECEIVE: {
      const { channel: { favorites } } = action;

      nextState = Object.assign({}, state);
      favorites.forEach((favorite) => {
        nextState[favorite.id] = favorite;
      });

      return nextState;
    }
    default:
      return state;
  }
};

export default favoriteReducer;
