import { FAVORITE, CHANNEL } from '../actions/actionTypes';

const favoriteReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case FAVORITE.INDEX.RECEIVE: {
      const { favorites } = action;
      nextState = {};
      favorites.forEach((fav) => { nextState[fav.messageSlug] = fav; });
      return Object.assign({}, state, nextState);
    }
    case FAVORITE.CREATE.RECEIVE: {
      const { favorite } = action;
      nextState = { [favorite.messageSlug]: favorite };
      return Object.assign({}, state, nextState);
    }
    case FAVORITE.DELETE.RECEIVE: {
      const { favorite } = action;
      nextState = Object.assign({}, state);
      delete nextState[favorite.messageSlug];
      return nextState;
    }
    case CHANNEL.SHOW.RECEIVE: {
      const { channel: { favorites } } = action;
      nextState = {};
      favorites.forEach((fav) => { nextState[fav.messageSlug] = fav; });
      return nextState;
    }
    default:
      return state;
  }
};

export default favoriteReducer;
