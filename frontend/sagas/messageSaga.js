import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest
} from 'redux-saga/effects';
import { MESSAGE, HISTORY } from '../actions/actionTypes';
import * as actions from '../actions/messageActions';
import * as api from '../util/apiUtil';
import { selectUIByDisplay } from '../reducers/selectors';

function* fetchIndex({ channelSlug }) {
  try {
    const messages = yield call(api.apiFetch, `channels/${channelSlug}/messages`);
    yield put(actions.fetchMessages.receive(messages));
  } catch (error) {
    yield put(actions.fetchMessage.failure(error));
  }
}

function* fetchHistoryIndex({ startDate }) {
  try {
    const channelSlug = yield select(selectUIByDisplay, 'displayChannelSlug');
    const apiUrl = `channels/${channelSlug}/recent_messages/${startDate}`;
    const history = yield call(api.apiFetch, apiUrl);
    yield put(actions.fetchHistory.receive(history));
  } catch (error) {
    yield put(actions.fetchHistory.failure(error));
  }
}

function* loadMessage({ messageSlug }) {
  try {
    const message = yield call(api.apiFetch, `messages/${messageSlug}`);
    yield put(actions.fetchMessage.receive(message));
  } catch (error) {
    yield put(actions.fetchMessage.failure(error));
  }
}

function* fetchNewMessage({ message }) {
  try {
    yield call(api.apiCreate, 'messages', message);
  } catch (error) {
    yield put(actions.createMessage.failure(error));
  }
}

function* fetchEditMessage({ message }) {
  try {
    yield call(api.apiUpdate, `messages/${message.slug}`, message);
  } catch (error) {
    yield put(actions.updateMessage.failure(error));
  }
}

function* fetchDeleteMessage({ messageSlug }) {
  try {
    yield call(api.apiDelete, `messages/${messageSlug}`);
  } catch (error) {
    yield put(actions.deleteMessage.failure(error));
  }
}

function* watchIndex() {
  yield takeLatest(MESSAGE.INDEX.REQUEST, fetchIndex);
}

function* watchHistoryIndex() {
  yield takeLatest(HISTORY.INDEX.REQUEST, fetchHistoryIndex);
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
  yield takeLatest(MESSAGE.DESTROY.REQUEST, fetchDeleteMessage);
}

export default function* messageSaga() {
  yield all([
    fork(watchIndex),
    fork(watchHistoryIndex),
    fork(watchRequestMessage),
    fork(watchCreateMessage),
    fork(watchEditMessage),
    fork(watchDeleteMessage),
  ]);
}
