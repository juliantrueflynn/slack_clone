import { call, put, takeLatest } from 'redux-saga/effects';
import { USER_THREAD } from '../actions/actionTypes';
import { fetchUserThreads } from '../actions/messageActions';
import { apiFetch } from '../util/apiUtil';

function* fetchUserThreadIndex() {
  try {
    const messageThreads = yield call(apiFetch, 'user_threads');
    yield put(fetchUserThreads.receive(messageThreads));
  } catch (error) {
    yield put(fetchUserThreads.failure(error));
  }
}

export default function* userThreadSaga() {
  yield takeLatest(USER_THREAD.INDEX.REQUEST, fetchUserThreadIndex);
}
