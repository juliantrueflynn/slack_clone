import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/rightSidebarActions';
import { messageRequest, messageFailure } from '../actions/messageActions';
import { fetchMessage } from '../util/messageAPIUtil';
import * as api from '../util/favoriteAPIUtil';
import { favoritesRequest } from '../actions/favoriteActions';

function* fetchOpenRightSidebar({ sidebarType, sidebarProps }) {
  try {
    if (sidebarType === 'Thread') {
      yield put(messageRequest(sidebarProps.messageSlug));
    }

    if (sidebarType === 'Favorites') {
      yield put(favoritesRequest());
    }
  } catch (error) {
    yield put(messageFailure(error));
  }
}

function* fetchCloseRightSidebar({ messageSlug }) {
  try {
    const favorite = yield call(api.deleteFavorite, messageSlug);
    yield put(actions.deleteFavoriteReceive(favorite));
  } catch (error) {
    yield put(actions.deleteFavoriteFailure(error));
  }
}

function* watchOpenRightSidebar() {
  yield takeLatest(actions.OPEN_RIGHT_SIDEBAR, fetchOpenRightSidebar);
}

function* watchCloseRightSidebar() {
  // yield takeLatest(actions.CLOSE_RIGHT_SIDEBAR, fetchCloseRightSidebar);
}

export function* rightSidebarSaga() {
  yield all([
    fork(watchOpenRightSidebar),
    fork(watchCloseRightSidebar),
  ]);
}