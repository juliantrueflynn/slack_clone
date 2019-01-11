import {
  all,
  fork,
  takeLatest,
  call,
  put,
  select,
} from 'redux-saga/effects';
import { USER_THREAD, MESSAGE } from '../actions/actionTypes';
import { fetchUserThreads, fetchMessage } from '../actions/messageActions';
import { apiFetch } from '../util/apiUtil';
import { selectEntityBySlug, selectUIByDisplay } from '../reducers/selectors';

function* userThreadIndex({ workspaceSlug }) {
  try {
    const messageThreads = yield call(apiFetch, `workspaces/${workspaceSlug}/user_threads`);
    yield put(fetchUserThreads.receive(messageThreads));
  } catch (error) {
    yield put(fetchUserThreads.failure(error));
  }
}

function* newMessageInView({ message }) {
  if (!message.parentMessageId) {
    return;
  }

  const currView = yield select(selectUIByDisplay, 'displayChatPath');

  if (currView === 'threads') {
    const parent = yield select(selectEntityBySlug, 'messages', message.parentMessageSlug);

    if (!parent || !parent.slug) {
      yield put(fetchMessage.request(message.parentMessageSlug));
    }
  }
}

function* watchUserThreadIndexRequest() {
  yield takeLatest(USER_THREAD.INDEX.REQUEST, userThreadIndex);
}

function* watchMessageCreateReceive() {
  yield takeLatest(MESSAGE.CREATE.RECEIVE, newMessageInView);
}

export default function* allThreadsSaga() {
  yield all([
    fork(watchUserThreadIndexRequest),
    fork(watchMessageCreateReceive),
  ]);
}
