import { actionCreator } from '../util/actionsUtil';
import { FAVORITE } from './actionTypes';

export const fetchFavorites = {
  request: () => actionCreator(FAVORITE.INDEX.REQUEST),
  receive: favorites => actionCreator(FAVORITE.INDEX.RECEIVE, { favorites }),
  failure: errors => actionCreator(FAVORITE.INDEX.DELETE, { errors }),
};

export const createFavorite = {
  request: messageSlug => actionCreator(FAVORITE.CREATE.REQUEST, { messageSlug }),
  failure: errors => actionCreator(FAVORITE.CREATE.FAILURE, { errors }),
};

export const deleteFavorite = {
  request: messageSlug => actionCreator(FAVORITE.DELETE.REQUEST, { messageSlug }),
  failure: errors => actionCreator(FAVORITE.DELETE.FAILURE, { errors }),
};
