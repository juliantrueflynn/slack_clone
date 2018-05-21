import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/favoriteActions';
import * as api from '../util/favoriteAPIUtil';

function* fetchCreateFavorite({ messageId }) {
  try {
    const newFavorite = yield call(api.createFavorite, { messageId });
    yield put(actions.createFavoriteReceive(newFavorite));
  } catch (error) {
    yield put(actions.createFavoriteFailure(error));
  }
}

function* fetchDeleteFavorite({ favoriteId }) {
  try {
    const favorite = yield call(api.deleteFavorite, favoriteId);
    yield put(actions.deleteFavoriteReceive(favorite));
  } catch (error) {
    yield put(actions.deleteFavoriteFailure(error));
  }
}

function* watchCreateFavorite() {
  yield takeLatest(actions.CREATE_FAVORITE_REQUEST, fetchCreateFavorite);
}

function* watchDeleteFavorite() {
  yield takeLatest(actions.DELETE_FAVORITE_REQUEST, fetchDeleteFavorite);
}

export function* favoriteSaga() {
  yield all([
    fork(watchCreateFavorite),
    fork(watchDeleteFavorite),
  ]);
}