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

function* fetchUserThreadIndex({ workspaceSlug }) {
  try {
    const messageThreads = yield call(apiFetch, `workspaces/${workspaceSlug}/user_threads`);
    yield put(fetchUserThreads.receive(messageThreads));
  } catch (error) {
    yield put(fetchUserThreads.failure(error));
  }
}

function* fetchNewMessageConvo({ message: { message } }) {
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

function* watchUserThreadIndex() {
  yield takeLatest(USER_THREAD.INDEX.REQUEST, fetchUserThreadIndex);
}

function* watchCreateMessage() {
  yield takeLatest(MESSAGE.CREATE.RECEIVE, fetchNewMessageConvo);
}

export default function* userThreadSaga() {
  yield all([
    fork(watchUserThreadIndex),
    fork(watchCreateMessage),
  ]);
}
