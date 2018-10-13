import {
  DRAWER_CLOSE,
  MESSAGE,
  FAVORITE,
  USER,
} from '../actions/actionTypes';

const isDrawerLoadingReducer = (state = false, action) => {
  switch (action.type) {
    case MESSAGE.SHOW.REQUEST:
    case FAVORITE.INDEX.REQUEST:
    case USER.SHOW.REQUEST:
      return true;
    case MESSAGE.SHOW.RECEIVE:
    case FAVORITE.INDEX.RECEIVE:
    case USER.SHOW.RECEIVE:
    case DRAWER_CLOSE:
      return false;
    default:
      return state;
  }
};

export default isDrawerLoadingReducer;
