import {
  take, all, call, fork, put, takeEvery, select
} from 'redux-saga/effects';
import * as actions from '../actions/message_actions';
import * as utilApi from '../util/message_api_util';
import { getChannelPageId } from '../reducers/selectors';
import { camelizeKeys } from 'humps';

function* fetchNewMessage({ message }) {
  try {
    const camelizedMessage = camelizeKeys(message);
    yield put(actions.createMessageSuccess(camelizedMessage));
  } catch (error) {
    yield put(actions.receiveMessageErrors(error));
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

function* fetchDeleteMessage({ messageId }) {
  try {
    yield call(utilApi.deleteMessage, messageId);
    yield put(actions.deleteMessageSuccess(messageId));
  } catch (error) {
    yield put(actions.receiveMessageErrors(error));
  }
}

function* watchCreateMessage() {
  yield takeEvery(actions.CREATE_MESSAGE, fetchNewMessage);
}

function* watchDeleteMessage() {
  yield takeEvery(actions.DELETE_MESSAGE, fetchDeleteMessage);
}

export function* messageSaga() {
  yield all([
    fork(watchCreateMessage),
    fork(watchDeleteMessage),
  ]);
}