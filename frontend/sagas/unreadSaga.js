import {
  all,
  fork,
  takeLatest,
  call,
  put,
  select,
} from 'redux-saga/effects';
import { READ, CLEAR_UNREADS, USER_THREAD } from '../actions/actionTypes';
import { apiFetch, apiUpdate, apiCreate } from '../util/apiUtil';
import { fetchUnreads } from '../actions/readActions';
import { getAllUnreads } from '../reducers/selectors';

function* fetchIndex({ workspaceSlug }) {
  try {
    const received = yield call(apiFetch, `workspaces/${workspaceSlug}/user_unreads`);
    yield put(fetchUnreads.receive(received));
  } catch (error) {
    yield put(fetchUnreads.failure(error));
  }
}

function* fetchUserThreadIndexPage() {
  const unreadsMap = yield select(getAllUnreads);
  const unreads = Object.values(unreadsMap);
  const msgs = unreads.filter(unread => unread.hasUnreads && unread.readableType === 'Message');

  yield all(msgs.map((unread) => {
    const apiCall = unread.lastRead ? apiUpdate : apiCreate;
    const read = { readableId: unread.readableId, readableType: 'Message' };

    return call(apiCall, 'reads', read);
  }));
}

function* fetchClearUnreads({ channelSlug }) {
  const unreadsMap = yield select(getAllUnreads);
  const { readableId, readableType } = unreadsMap[channelSlug];
  yield call(apiUpdate, 'read', { readableId, readableType });
}

function* watchIndex() {
  yield takeLatest(READ.INDEX.REQUEST, fetchIndex);
}

function* watchUserThreadIndex() {
  yield takeLatest(USER_THREAD.INDEX.REQUEST, fetchUserThreadIndexPage);
}

function* watchClearUnreads() {
  yield takeLatest(CLEAR_UNREADS, fetchClearUnreads);
}

export default function* unreadSaga() {
  yield all([
    fork(watchIndex),
    fork(watchUserThreadIndex),
    fork(watchClearUnreads),
  ]);
}
