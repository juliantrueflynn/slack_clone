import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/messageActions';
import { DELETE_MESSAGE, UPDATE_MESSAGE, CREATE_MESSAGE, MESSAGE } from '../actions/actionTypes';
import * as api from '../util/messageAPIUtil';

function* loadMessage({ messageSlug }) {
  try {
    const message = yield call(api.fetchMessage, messageSlug);
    yield put(actions.messageReceive(message));
  } catch (error) {
    yield put(actions.messageFailure(error));
  }
}

function* fetchNewMessage({ message }) {
  try {
    yield call(api.createMessage, message);
  } catch (error) {
    yield put(actions.createMessageFailure(error));
  }
}

function* fetchEditMessage({ message }) {
  try {
    yield call(api.editMessage, message);
  } catch (error) {
    yield put(actions.editMessageFailure(error));
  }
}

function* fetchDeleteMessage({ messageSlug }) {
  try {
    yield call(api.deleteMessage, messageSlug);
  } catch (error) {
    yield put(actions.deleteMessageFailure(error));
  }
}

function* watchRequestMessage() {
  yield takeLatest(MESSAGE.REQUEST, loadMessage);
}

function* watchCreateMessage() {
  yield takeLatest(CREATE_MESSAGE.REQUEST, fetchNewMessage);
}

function* watchEditMessage() {
  yield takeLatest(UPDATE_MESSAGE.REQUEST, fetchEditMessage);
}

function* watchDeleteMessage() {
  yield takeLatest(DELETE_MESSAGE.REQUEST, fetchDeleteMessage);
}

export function* messageSaga() {
  yield all([
    fork(watchRequestMessage),
    fork(watchCreateMessage),
    fork(watchEditMessage),
    fork(watchDeleteMessage),
  ]);
}
