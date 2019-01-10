import {
  all,
  call,
  fork,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { FAVORITE, FAVORITE_TOGGLE } from '../actions/actionTypes';
import { fetchFavorites, createFavorite, destroyFavorite } from '../actions/favoriteActions';
import { apiFetch, apiCreate, apiDestroy } from '../util/apiUtil';

function* loadIndexFavorite({ workspaceSlug }) {
  try {
    const favorites = yield call(apiFetch, `workspaces/${workspaceSlug}/favorites`);
    yield put(fetchFavorites.receive(favorites));
  } catch (error) {
    yield put(fetchFavorites.failure(error));
  }
}

function* loadToggleFavorite({ favorite }) {
  if (favorite.id) {
    yield put(destroyFavorite.request(favorite.id));
  } else {
    yield put(createFavorite.request(favorite));
  }
}

function* loadCreateFavorite({ favorite }) {
  try {
    const response = yield call(apiCreate, 'favorites', favorite);
    yield put(createFavorite.receive(response));
  } catch (error) {
    yield put(createFavorite.failure(error));
  }
}

function* loadDestroyFavorite({ id }) {
  try {
    const response = yield call(apiDestroy, `favorites/${id}`);
    yield put(destroyFavorite.receive(response));
  } catch (error) {
    yield put(destroyFavorite.failure(error));
  }
}

function* watchFavoriteToggle() {
  yield takeLatest(FAVORITE_TOGGLE, loadToggleFavorite);
}

function* watchFavoriteIndex() {
  yield takeLatest(FAVORITE.INDEX.REQUEST, loadIndexFavorite);
}

function* watchFavoriteCreate() {
  yield takeLatest(FAVORITE.CREATE.REQUEST, loadCreateFavorite);
}

function* watchFavoriteDestroy() {
  yield takeLatest(FAVORITE.DESTROY.REQUEST, loadDestroyFavorite);
}

export default function* favoriteSaga() {
  yield all([
    fork(watchFavoriteToggle),
    fork(watchFavoriteIndex),
    fork(watchFavoriteCreate),
    fork(watchFavoriteDestroy),
  ]);
}
