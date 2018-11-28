import { actionCreator } from '../util/actionsUtil';
import { FAVORITE, FAVORITE_TOGGLE } from './actionTypes';

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

export const destroyFavorite = {
  request: id => actionCreator(FAVORITE.DESTROY.REQUEST, { id }),
  receive: favorite => actionCreator(FAVORITE.DESTROY.RECEIVE, { favorite }),
  failure: errors => actionCreator(FAVORITE.DESTROY.FAILURE, { errors }),
};

export const toggleFavorite = favorite => actionCreator(FAVORITE_TOGGLE, { favorite });
