import {
  DRAWER_CLOSE,
  MESSAGE,
  FAVORITE,
  MEMBER,
} from '../actions/actionTypes';

const isDrawerLoadingReducer = (state = false, action) => {
  switch (action.type) {
    case MESSAGE.SHOW.REQUEST:
    case FAVORITE.INDEX.REQUEST:
    case MEMBER.SHOW.REQUEST:
      return true;
    case MESSAGE.SHOW.RECEIVE:
    case FAVORITE.INDEX.RECEIVE:
    case MEMBER.SHOW.RECEIVE:
    case DRAWER_CLOSE:
      return false;
    default:
      return state;
  }
};

export default isDrawerLoadingReducer;
