import { actionCreator } from '../util/actionsUtil';
import { FAVORITE } from './actionTypes';

export const fetchFavorites = {
  request: () => actionCreator(FAVORITE.INDEX.REQUEST),
  receive: favorites => actionCreator(FAVORITE.INDEX.RECEIVE, { favorites }),
  failure: errors => actionCreator(FAVORITE.INDEX.DELETE, { errors }),
};

export const createFavorite = {
  request: messageSlug => actionCreator(FAVORITE.CREATE.REQUEST, { messageSlug }),
  receive: favorite => actionCreator(FAVORITE.CREATE.RECEIVE, { favorite }),
  failure: errors => actionCreator(FAVORITE.CREATE.FAILURE, { errors }),
};

export const deleteFavorite = {
  request: messageSlug => actionCreator(FAVORITE.SHOW.REQUEST, { messageSlug }),
  receive: favorite => actionCreator(FAVORITE.SHOW.RECEIVE, { favorite }),
  failure: errors => actionCreator(FAVORITE.SHOW.FAILURE, { errors }),
};
