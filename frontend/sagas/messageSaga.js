import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/messageActions';
import { MESSAGE } from '../actions/actionTypes';
import { apiFetch, apiCreate, apiUpdate, apiDelete } from '../util/apiUtil';

function* loadMessage({ messageSlug }) {
  try {
    const message = yield call(apiFetch, `messages/${messageSlug}`);
    yield put(actions.fetchMessage.receive(message));
  } catch (error) {
    yield put(actions.fetchMessage.failure(error));
  }
}

function* fetchNewMessage({ message }) {
  try {
    yield call(apiCreate, 'messages', message);
  } catch (error) {
    yield put(actions.createMessage.failure(error));
  }
}

function* fetchEditMessage({ message }) {
  try {
    yield call(apiUpdate, `messages/${message.slug}`, message);
  } catch (error) {
    yield put(actions.updateMessage.failure(error));
  }
}

function* fetchDeleteMessage({ messageSlug }) {
  try {
    yield call(apiDelete, `messages/${messageSlug}`);
  } catch (error) {
    yield put(actions.deleteMessage.failure(error));
  }
}

function* watchRequestMessage() {
  yield takeLatest(MESSAGE.SHOW.REQUEST, loadMessage);
}

function* watchCreateMessage() {
  yield takeLatest(MESSAGE.CREATE.REQUEST, fetchNewMessage);
}

function* watchEditMessage() {
  yield takeLatest(MESSAGE.UPDATE.REQUEST, fetchEditMessage);
}

function* watchDeleteMessage() {
  yield takeLatest(MESSAGE.DELETE.REQUEST, fetchDeleteMessage);
}

export default function* messageSaga() {
  yield all([
    fork(watchRequestMessage),
    fork(watchCreateMessage),
    fork(watchEditMessage),
    fork(watchDeleteMessage),
  ]);
}
