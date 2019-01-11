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

function* favoriteIndex({ workspaceSlug }) {
  try {
    const favorites = yield call(apiFetch, `workspaces/${workspaceSlug}/favorites`);
    yield put(fetchFavorites.receive(favorites));
  } catch (error) {
    yield put(fetchFavorites.failure(error));
  }
}

function* favoriteToggle({ favorite }) {
  if (favorite.id) {
    yield put(destroyFavorite.request(favorite.id));
  } else {
    yield put(createFavorite.request(favorite));
  }
}

function* favoriteCreate({ favorite }) {
  try {
    const response = yield call(apiCreate, 'favorites', favorite);
    yield put(createFavorite.receive(response));
  } catch (error) {
    yield put(createFavorite.failure(error));
  }
}

function* favoriteDestroy({ id }) {
  try {
    const response = yield call(apiDestroy, `favorites/${id}`);
    yield put(destroyFavorite.receive(response));
  } catch (error) {
    yield put(destroyFavorite.failure(error));
  }
}

function* watchFavoriteUpdateRequest() {
  yield takeLatest(FAVORITE_TOGGLE, favoriteToggle);
}

function* watchFavoriteIndexRequest() {
  yield takeLatest(FAVORITE.INDEX.REQUEST, favoriteIndex);
}

function* watchFavoriteCreateRequest() {
  yield takeLatest(FAVORITE.CREATE.REQUEST, favoriteCreate);
}

function* watchFavoriteDestroyRequest() {
  yield takeLatest(FAVORITE.DESTROY.REQUEST, favoriteDestroy);
}

export default function* favoriteSaga() {
  yield all([
    fork(watchFavoriteUpdateRequest),
    fork(watchFavoriteIndexRequest),
    fork(watchFavoriteCreateRequest),
    fork(watchFavoriteDestroyRequest),
  ]);
}
