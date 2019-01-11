import {
  all,
  fork,
  takeLatest,
  call,
  put,
  select,
} from 'redux-saga/effects';
import { READ, UNREAD_CLEAR_ALL, USER_THREAD } from '../actions/actionTypes';
import { apiFetch, apiCreate, apiUpdate } from '../util/apiUtil';
import { fetchUnreads, clearAllUnread } from '../actions/readActions';
import { getAllUnreads } from '../reducers/selectors';

function* fetchIndex({ workspaceSlug }) {
  try {
    const received = yield call(apiFetch, `workspaces/${workspaceSlug}/user_unreads`);
    yield put(fetchUnreads.receive(received));
  } catch (error) {
    yield put(fetchUnreads.failure(error));
  }
}

function* updateUnreadsByAllThreads() {
  const unreadsMap = yield select(getAllUnreads);
  const unreads = Object.values(unreadsMap).filter(unread => (
    unread && unread.hasUnreads && unread.readableType === 'Message'
  ));

  yield all(unreads.map(({ lastRead, readableId }) => {
    const apiCall = lastRead ? apiUpdate : apiCreate;

    return call(apiCall, 'read', { readableId, readableType: 'Message' });
  }));

  if (unreads.length) {
    yield put(clearAllUnread('threads'));
  }
}

function* updateUnreadsByChat(chatPath) {
  if (chatPath === 'threads') {
    return;
  }

  const unreadsMap = yield select(getAllUnreads);
  const { readableId, readableType } = unreadsMap[chatPath];
  yield call(apiUpdate, 'read', { readableId, readableType });
}

function* watchReadIndexRequest() {
  yield takeLatest(READ.INDEX.REQUEST, fetchIndex);
}

function* watchUserThreadIndexRequest() {
  yield takeLatest(USER_THREAD.INDEX.REQUEST, updateUnreadsByAllThreads);
}

function* watchClearAllUnreads() {
  yield takeLatest(UNREAD_CLEAR_ALL, updateUnreadsByChat);
}

export default function* allUnreadsSaga() {
  yield all([
    fork(watchReadIndexRequest),
    fork(watchUserThreadIndexRequest),
    fork(watchClearAllUnreads),
  ]);
}
