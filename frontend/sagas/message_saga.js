import {
  take, all, call, fork, put, takeEvery, select, takeLatest
} from 'redux-saga/effects';
import * as actions from '../actions/message_actions';
import * as utilApi from '../util/message_api_util';
import {
  getChannelPageId, getMessages, getWorkspacePageId, getCurrentUser
} from '../reducers/selectors';
import { loadWorkspacePage } from '../actions/workspace_actions';
import { fetchWorkspace } from './workspace_saga';

function* addNewMessage({ message }) {
  try {
    const newMessage = yield call(utilApi.createMessage, message);
    yield put(actions.createMessageSuccess(newMessage));
  } catch (error) {
    yield put(actions.receiveMessageErrors(error));
  }
}

function* fetchChannelMessages() {
  try {
    // yield put(actions.receiveMessage(message));
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

function* fetchDeleteMessage({ messageId }) {
  try {
    yield call(utilApi.deleteMessage, messageId);
    yield put(actions.deleteMessageSuccess(messageId));
  } catch (error) {
    yield put(actions.receiveMessageErrors(error));
  }
}

function* watchCreateMessage() {
  yield takeEvery(actions.CREATE_MESSAGE, addNewMessage);
}

function* watchMessagePage() {
  yield takeLatest(actions.LOAD_MESSAGES, fetchChannelMessages);
}

function* watchDeleteMessage() {
  yield takeLatest(actions.DELETE_MESSAGE, fetchDeleteMessage);
}

export function* messageSaga() {
  yield all([
    fork(watchCreateMessage),
    fork(watchMessagePage),
    fork(watchDeleteMessage),
  ]);
}