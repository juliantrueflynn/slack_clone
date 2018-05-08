import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/message_actions';
import * as utilApi from '../util/message_api_util';

function* fetchNewMessage({ message }) {
  try {
    yield call(utilApi.createMessage, message);
  } catch (error) {
    yield put(actions.failureMessage(error));
  }
}

function* fetchEditMessage({ message }) {
  try {
    yield call(utilApi.editMessage, message);
  } catch (error) {
    yield put(actions.failureMessage(error));
  }
}

function* fetchDeleteMessage({ messageId }) {
  try {
    yield call(utilApi.deleteMessage, messageId);
  } catch (error) {
    yield put(actions.failureMessage(error));
  }
}

function* watchCreateMessage() {
  yield takeLatest(actions.CREATE_MESSAGE, fetchNewMessage);
}

function* watchEditMessage() {
  yield takeLatest(actions.EDIT_MESSAGE, fetchEditMessage);
}

function* watchDeleteMessage() {
  yield takeLatest(actions.DELETE_MESSAGE, fetchDeleteMessage);
}

export function* messageSaga() {
  yield all([
    fork(watchCreateMessage),
    fork(watchEditMessage),
    fork(watchDeleteMessage),
  ]);
}