import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/favoriteActions';
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
    const newFavorite = yield call(api.createFavorite, { messageId });
    yield put(actions.createFavoriteReceive(newFavorite));
  } catch (error) {
    yield put(actions.createFavoriteFailure(error));
  }
}

function* fetchDeleteFavorite({ messageSlug }) {
  try {
    const favorite = yield call(api.deleteFavorite, messageSlug);
    yield put(actions.deleteFavoriteReceive(favorite));
  } catch (error) {
    yield put(actions.deleteFavoriteFailure(error));
  }
}

function* watchUserFavorites() {
  yield takeLatest(actions.FAVORITES_REQUEST, fetchUserFavorites);
}

function* watchCreateFavorite() {
  yield takeLatest(actions.CREATE_FAVORITE_REQUEST, fetchCreateFavorite);
}

function* watchDeleteFavorite() {
  yield takeLatest(actions.DELETE_FAVORITE_REQUEST, fetchDeleteFavorite);
}

export function* favoriteSaga() {
  yield all([
    fork(watchUserFavorites),
    fork(watchCreateFavorite),
    fork(watchDeleteFavorite),
  ]);
}