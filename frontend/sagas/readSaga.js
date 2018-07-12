import { all, fork, put, takeLatest, takeEvery, call } from 'redux-saga/effects';
import { READ, USER_UNREADS } from '../actions/actionTypes';
import { apiUpdate, apiFetch } from '../util/apiUtil';
import { readUpdate, fetchUnreads } from '../actions/readActions';

function* loadReadDateTime({ readableId, readableType }) {
  try {
    const newUnread = yield call(apiUpdate, 'read', { readableId, readableType });
    yield put(readUpdate.receive(newUnread));
  } catch (error) {
    yield put(readUpdate.failure(error));
  }
}

function* loadUnreads({ workspaceId }) {
  try {
    const unreads = yield call(apiFetch, `workspace/${workspaceId}/user_unreads`);
    yield put(fetchUnreads.receive(unreads));
  } catch (error) {
    yield put(fetchUnreads.failure(error));
  }
}

function* watchReadEntity() {
  yield takeEvery(READ.UPDATE.REQUEST, loadReadDateTime);
}

function* watchAllUnreadsPage() {
  yield takeLatest(USER_UNREADS.INDEX.REQUEST, loadUnreads);
}

export default function* readSaga() {
  yield all([
    fork(watchReadEntity),
    fork(watchAllUnreadsPage),
  ]);
}
