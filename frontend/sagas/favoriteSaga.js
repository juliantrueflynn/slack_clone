import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/favoriteActions';
import { CREATE_FAVORITE, DELETE_FAVORITE, FAVORITES } from '../actions/actionTypes';
import * as api from '../util/favoriteAPIUtil';

function* fetchUserFavorites() {
  try {
    const favorites = yield call(api.fetchFavorites);
    yield put(actions.favoritesReceive(favorites));
  } catch (error) {
    yield put(actions.favoritesFailure(error));
  }
}

function* fetchCreateFavorite({ messageSlug: messageId }) {
  try {
    yield call(api.createFavorite, { messageId });
  } catch (error) {
    yield put(actions.createFavoriteFailure(error));
  }
}

function* fetchDeleteFavorite({ messageSlug }) {
  try {
    yield call(api.deleteFavorite, messageSlug);
  } catch (error) {
    yield put(actions.deleteFavoriteFailure(error));
  }
}

function* watchUserFavorites() {
  yield takeLatest(FAVORITES.REQUEST, fetchUserFavorites);
}

function* watchCreateFavorite() {
  yield takeLatest(CREATE_FAVORITE.REQUEST, fetchCreateFavorite);
}

function* watchDeleteFavorite() {
  yield takeLatest(DELETE_FAVORITE.REQUEST, fetchDeleteFavorite);
}

export function* favoriteSaga() {
  yield all([
    fork(watchUserFavorites),
    fork(watchCreateFavorite),
    fork(watchDeleteFavorite),
  ]);
}
