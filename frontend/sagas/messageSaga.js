import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/messageActions';
import * as api from '../util/messageAPIUtil';

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
    yield call(api.deleteMessageRequest, messageSlug);
  } catch (error) {
    yield put(actions.deleteMessageFailure(error));
  }
}

function* watchCreateMessage() {
  yield takeLatest(actions.CREATE_MESSAGE_REQUEST, fetchNewMessage);
}

function* watchEditMessage() {
  yield takeLatest(actions.UPDATE_MESSAGE_REQUEST, fetchEditMessage);
}

function* watchDeleteMessage() {
  yield takeLatest(actions.DELETE_MESSAGE_REQUEST, fetchDeleteMessage);
}

export function* messageSaga() {
  yield all([
    fork(watchCreateMessage),
    fork(watchEditMessage),
    fork(watchDeleteMessage),
  ]);
}