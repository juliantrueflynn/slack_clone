import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/threadMessageActions';
import { THREAD_MESSAGE } from '../actions/actionTypes';
import { apiFetch, apiCreate, apiUpdate, apiDelete } from '../util/apiUtil';

function* loadThreadMessages({ messageSlug }) {
  try {
    const threadMessages = yield call(apiFetch, `messages/${messageSlug}/thread_messages`);
    yield put(actions.fetchThreadMessages.receive(threadMessages));
  } catch (error) {
    yield put(actions.fetchThreadMessages.failure(error));
  }
}

function* loadThreadMessage({ messageSlug }) {
  try {
    const message = yield call(apiFetch, `thread_messages/${messageSlug}`);
    yield put(actions.fetchThreadMessage.receive(message));
  } catch (error) {
    yield put(actions.fetchThreadMessage.failure(error));
  }
}

function* fetchNewThreadMessage({ message }) {
  try {
    yield call(apiCreate, 'thread_messages', message);
  } catch (error) {
    yield put(actions.createThreadMessage.failure(error));
  }
}

function* fetchEditThreadMessage({ message }) {
  try {
    yield call(apiUpdate, `thread_messages/${message.slug}`, message);
  } catch (error) {
    yield put(actions.updateThreadMessage.failure(error));
  }
}

function* fetchDeleteThreadMessage({ messageSlug }) {
  try {
    yield call(apiDelete, `thread_messages/${messageSlug}`);
  } catch (error) {
    yield put(actions.deleteThreadMessage.failure(error));
  }
}

function* watchRequestThreadMessages() {
  yield takeLatest(THREAD_MESSAGE.INDEX.REQUEST, loadThreadMessages);
}

function* watchRequestThreadMessage() {
  yield takeLatest(THREAD_MESSAGE.SHOW.REQUEST, loadThreadMessage);
}

function* watchCreateThreadMessage() {
  yield takeLatest(THREAD_MESSAGE.CREATE.REQUEST, fetchNewThreadMessage);
}

function* watchEditThreadMessage() {
  yield takeLatest(THREAD_MESSAGE.UPDATE.REQUEST, fetchEditThreadMessage);
}

function* watchDeleteThreadMessage() {
  yield takeLatest(THREAD_MESSAGE.DELETE.REQUEST, fetchDeleteThreadMessage);
}

export default function* threadThreadMessageSaga() {
  yield all([
    fork(watchRequestThreadMessages),
    fork(watchRequestThreadMessage),
    fork(watchCreateThreadMessage),
    fork(watchEditThreadMessage),
    fork(watchDeleteThreadMessage),
  ]);
}
