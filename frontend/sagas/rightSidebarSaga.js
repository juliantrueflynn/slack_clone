import { put, takeLatest } from 'redux-saga/effects';
import { OPEN_RIGHT_SIDEBAR } from '../actions/actionTypes';
import { messageRequest, messageFailure } from '../actions/messageActions';
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

export default function* rightSidebarSaga() {
  yield takeLatest(OPEN_RIGHT_SIDEBAR, fetchOpenRightSidebar);
}
