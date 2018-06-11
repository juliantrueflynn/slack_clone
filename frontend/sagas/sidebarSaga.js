import { put, takeLatest } from 'redux-saga/effects';
import { OPEN_RIGHT_SIDEBAR } from '../actions/actionTypes';
import { fetchMessage } from '../actions/messageActions';
import { fetchFavorites } from '../actions/favoriteActions';

function* fetchOpenRightSidebar({ sidebarType, sidebarProps }) {
  try {
    if (sidebarType === 'Thread') {
      yield put(fetchMessage.request(sidebarProps.messageSlug));
    }

    if (sidebarType === 'Favorites') {
      yield put(fetchFavorites.request());
    }
  } catch (error) {
    yield put(fetchMessage.failure(error));
  }
}

export default function* sidebarSaga() {
  yield takeLatest(OPEN_RIGHT_SIDEBAR, fetchOpenRightSidebar);
}
