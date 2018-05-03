import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions/message_actions';
import * as utilApi from '../util/message_api_util';
import { getChannelPageId, getMessageById } from '../reducers/selectors';
import { camelizeKeys } from 'humps';

function* fetchNewMessage({ message }) {
  try {
    const camelizedMessage = camelizeKeys(message);
    const newMessage = yield call(utilApi.createMessage, camelizedMessage);
    yield put(actions.createMessageSuccess(newMessage));
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