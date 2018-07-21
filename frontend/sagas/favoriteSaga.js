import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { FAVORITE } from '../actions/actionTypes';
import { fetchFavorites, createFavorite, deleteFavorite } from '../actions/favoriteActions';
import { apiFetch, apiCreate, apiDelete } from '../util/apiUtil';

function* fetchIndex({ workspaceSlug }) {
  try {
    const favorites = yield call(apiFetch, `workspaces/${workspaceSlug}/favorites`);
    yield put(fetchFavorites.receive(favorites));
  } catch (error) {
    yield put(fetchFavorites.failure(error));
  }
}

function* fetchCreate({ favorite }) {
  try {
    const newFavorite = yield call(apiCreate, 'favorites', favorite);
    yield put(createFavorite.receive(newFavorite));
  } catch (error) {
    yield put(createFavorite.failure(error));
  }
}

function* fetchDestroy({ favoriteId }) {
  try {
    const favorite = yield call(apiDelete, `favorites/${favoriteId}`);
    yield put(deleteFavorite.receive(favorite));
  } catch (error) {
    yield put(deleteFavorite.failure(error));
  }
}

function* watchIndex() {
  yield takeLatest(FAVORITE.INDEX.REQUEST, fetchIndex);
}

function* watchCreate() {
  yield takeLatest(FAVORITE.CREATE.REQUEST, fetchCreate);
}

function* watchDestroy() {
  yield takeLatest(FAVORITE.DESTROY.REQUEST, fetchDestroy);
}

export default function* favoriteSaga() {
  yield all([
    fork(watchIndex),
    fork(watchCreate),
    fork(watchDestroy),
  ]);
}
