import {
  CREATE_FAVORITE_RECEIVE,
  DELETE_FAVORITE_RECEIVE
} from '../actions/favoriteActions';

const favoriteReducer = (state = {}, action) => {
  Object.freeze(state);

  let nextState;
  switch (action.type) {
    case CREATE_FAVORITE_RECEIVE : {
      const { favorite } = action;
      nextState = { [favorite.id]: favorite };

      return Object.assign({}, state, nextState);
    }
    case DELETE_FAVORITE_RECEIVE : {
      const { favorite } = action;
      nextState = Object.assign({}, state);
      delete nextState[favorite.id];
      
      return nextState;
    }
    default :
      return state;
  }
};

export default favoriteReducer;