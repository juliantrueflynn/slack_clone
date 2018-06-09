import {
  FAVORITES,
  CREATE_FAVORITE,
  DELETE_FAVORITE,
  CHANNEL
} from '../actions/actionTypes';

const favoriteReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case FAVORITES.RECEIVE: {
      const { favorites } = action;
      nextState = {};

      favorites.map((fav) => {
        nextState[fav.messageSlug] = fav;
      });

      return Object.assign({}, state, nextState);
    }
    case CREATE_FAVORITE.RECEIVE: {
      const { favorite } = action;
      nextState = { [favorite.messageSlug]: favorite };

      return Object.assign({}, state, nextState);
    }
    case DELETE_FAVORITE.RECEIVE: {
      const { favorite } = action;
      nextState = Object.assign({}, state);
      delete nextState[favorite.messageSlug];
      
      return nextState;
    }
    case CHANNEL.RECEIVE:
      const { channel: { favorites }, ui: { messageSlug, userId } } = action;
      let prevState = Object.assign({}, state);
      nextState = {};

      Object.values(prevState).map(fav => {
        if (fav.messageSlug === messageSlug) {
          nextState[fav.messageSlug] = fav;
        }

        if (fav.userId === userId) {
          nextState[fav.messageSlug] = fav;
        }
      });

      favorites.map(fav => {
        nextState[fav.messageSlug] = fav;
      });

      return nextState;
    default:
      return state;
  }
};

export default favoriteReducer;
