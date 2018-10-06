import { actionCreator } from '../util/actionsUtil';
import { FAVORITE } from './actionTypes';

export const fetchFavorites = {
  request: workspaceSlug => actionCreator(FAVORITE.INDEX.REQUEST, { workspaceSlug }),
  receive: messages => actionCreator(FAVORITE.INDEX.RECEIVE, { messages }),
  failure: errors => actionCreator(FAVORITE.INDEX.FAILURE, { errors }),
};

export const createFavorite = {
  request: favorite => actionCreator(FAVORITE.CREATE.REQUEST, { favorite }),
  receive: favorite => actionCreator(FAVORITE.CREATE.RECEIVE, { favorite }),
  failure: errors => actionCreator(FAVORITE.CREATE.FAILURE, { errors }),
};

export const deleteFavorite = {
  request: favoriteId => actionCreator(FAVORITE.DESTROY.REQUEST, { favoriteId }),
  receive: favorite => actionCreator(FAVORITE.DESTROY.RECEIVE, { favorite }),
  failure: errors => actionCreator(FAVORITE.DESTROY.FAILURE, { errors }),
};
