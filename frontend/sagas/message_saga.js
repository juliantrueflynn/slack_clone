import {
  take, all, call, fork, put, takeEvery, takeLatest, select
} from 'redux-saga/effects';
import * as actions from '../actions/message_actions';
import * as utilApi from '../util/message_api_util';
import { getChannelPageId, getMessageById } from '../reducers/selectors';
import { camelizeKeys } from 'humps';

function* fetchNewMessage({ message }) {
  try {
    const camelizedMessage = camelizeKeys(message);
    yield put(actions.createMessageSuccess(camelizedMessage));
  } catch (error) {
    yield put(actions.failureMessage(error));
  }
}

function* fetchEditMessage({ message }) {
  try {
    yield put(actions.editMessageSuccess(message));
  } catch (error) {
    yield put(actions.failureMessage(error));
  }
}

function* fetchMessage() {
  try {
    const messageId = yield select(getChannelPageId);
    const message = yield call(utilApi.fetchMessage, messageId);
    yield put(actions.receiveMessage(message));
  } catch (error) {
    yield put(actions.failureMessage(error));
  }
}

function* watchCreateMessage() {
  yield takeEvery(actions.CREATE_MESSAGE, fetchNewMessage);
}

function* watchEditMessage() {
  yield takeEvery(actions.EDIT_MESSAGE, fetchEditMessage);
}

export function* messageSaga() {
  yield all([
    fork(watchCreateMessage),
    fork(watchEditMessage),
  ]);
}