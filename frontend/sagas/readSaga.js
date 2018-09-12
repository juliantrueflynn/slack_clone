import {
  all,
  fork,
  put,
  takeLatest,
  select,
  call,
} from 'redux-saga/effects';
import { READ, MESSAGE } from '../actions/actionTypes';
import { apiUpdate, apiFetch } from '../util/apiUtil';
import * as actions from '../actions/readActions';
import { selectWorkspaceSlug, selectCurrentMessage } from '../reducers/selectors';

function* fetchIndex({ workspaceSlug }) {
  try {
    const received = yield call(apiFetch, `workspaces/${workspaceSlug}/reads`);
    yield put(actions.fetchUnreads.receive(received));
  } catch (error) {
    yield put(actions.fetchUnreads.failure(error));
  }
}

function* fetchCreate({ read }) {
  try {
    const workspaceSlug = yield select(selectWorkspaceSlug);
    const created = yield call(apiUpdate, `workspaces/${workspaceSlug}/reads`, read);
    yield put(actions.createRead.receive(created));
  } catch (error) {
    yield put(actions.createRead.failure(error));
  }
}

function* fetchUpdate({ read }) {
  try {
    const updated = yield call(apiUpdate, `reads/${read.id}`, read);
    yield put(actions.updateRead.receive(updated));
  } catch (error) {
    yield put(actions.updateRead.failure(error));
  }
}

function* fetchMessageThread({ message: { message } }) {
  // const message = yield select(selectCurrentMessage);

  // if (message.hasUnreads) {
    
  // }
}

function* watchIndex() {
  yield takeLatest(READ.INDEX.REQUEST, fetchIndex);
}

function* watchCreated() {
  yield takeLatest(READ.CREATE.REQUEST, fetchCreate);
}

function* watchUpdated() {
  yield takeLatest(READ.UPDATE.REQUEST, fetchUpdate);
}

function* watchMessageThread() {
  yield takeLatest(MESSAGE.SHOW.RECEIVE, fetchMessageThread);
}

export default function* readSaga() {
  yield all([
    fork(watchIndex),
    fork(watchCreated),
    fork(watchUpdated),
    fork(watchMessageThread),
  ]);
}
