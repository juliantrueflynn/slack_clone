import {
  all,
  fork,
  put,
  takeLatest,
  takeEvery,
  call,
} from 'redux-saga/effects';
import { READ } from '../actions/actionTypes';
import { apiUpdate, apiFetch } from '../util/apiUtil';
import { updateRead, fetchUnreads } from '../actions/readActions';

function* fetchIndex({ workspaceSlug }) {
  try {
    const received = yield call(apiFetch, `workspaces/${workspaceSlug}/reads`);
    yield put(fetchUnreads.receive(received));
  } catch (error) {
    yield put(fetchUnreads.failure(error));
  }
}

function* fetchCreate({ read }) {
  try {
    const created = yield call(apiUpdate, 'read', read);
    yield put(updateRead.receive(created));
  } catch (error) {
    yield put(updateRead.failure(error));
  }
}

function* fetchUpdate({ read }) {
  try {
    const updated = yield call(apiUpdate, 'read', read);
    yield put(updateRead.receive(updated));
  } catch (error) {
    yield put(updateRead.failure(error));
  }
}

function* watchIndex() {
  yield takeLatest(READ.INDEX.REQUEST, fetchIndex);
}

function* watchCreated() {
  yield takeEvery(READ.CREATE.REQUEST, fetchCreate);
}

function* watchUpdated() {
  yield takeEvery(READ.UPDATE.REQUEST, fetchUpdate);
}

export default function* readSaga() {
  yield all([
    fork(watchIndex),
    fork(watchCreated),
    fork(watchUpdated),
  ]);
}
