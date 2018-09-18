import {
  all,
  fork,
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';
import { UNREAD } from '../actions/actionTypes';
import { apiFetch } from '../util/apiUtil';
import { fetchUnreads } from '../actions/unreadActions';

function* fetchIndex({ workspaceSlug }) {
  try {
    const received = yield call(apiFetch, `workspaces/${workspaceSlug}/user_unreads`);
    yield put(fetchUnreads.receive(received));
  } catch (error) {
    yield put(fetchUnreads.failure(error));
  }
}

function* watchIndex() {
  yield takeLatest(UNREAD.INDEX.REQUEST, fetchIndex);
}

export default function* unreadSaga() {
  yield all([
    fork(watchIndex),
  ]);
}
