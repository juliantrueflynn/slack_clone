import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/favoriteActions';
import { FAVORITE } from '../actions/actionTypes';
import { apiFetch, apiCreate, apiDelete } from '../util/apiUtil';

function* fetchUserFavorites() {
  try {
    const favorites = yield call(apiFetch, 'favorites');
    yield put(actions.fetchFavorites.receive(favorites));
  } catch (error) {
    yield put(actions.fetchFavorites.failure(error));
  }
}

function* fetchCreateFavorite({ messageSlug: messageId }) {
  try {
    yield call(apiCreate, 'favorites', { messageId });
  } catch (error) {
    yield put(actions.createFavorite.failure(error));
  }
}

function* fetchDeleteFavorite({ messageSlug }) {
  try {
    yield call(apiDelete, 'favorites', messageSlug);
  } catch (error) {
    yield put(actions.deleteFavorite.failure(error));
  }
}

function* watchUserFavorites() {
  yield takeLatest(FAVORITE.INDEX.REQUEST, fetchUserFavorites);
}

function* watchCreateFavorite() {
  yield takeLatest(FAVORITE.CREATE.REQUEST, fetchCreateFavorite);
}

function* watchDeleteFavorite() {
  yield takeLatest(FAVORITE.DELETE.REQUEST, fetchDeleteFavorite);
}

export default function* favoriteSaga() {
  yield all([
    fork(watchUserFavorites),
    fork(watchCreateFavorite),
    fork(watchDeleteFavorite),
  ]);
}
