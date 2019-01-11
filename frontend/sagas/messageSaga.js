import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest
} from 'redux-saga/effects';
import { MESSAGE } from '../actions/actionTypes';
import * as actions from '../actions/messageActions';
import { navigate } from '../actions/uiActions';
import * as api from '../util/apiUtil';
import {
  selectUIByDisplay,
  getChatPathUrl,
  selectEntityBySlug,
  selectEntities,
} from '../reducers/selectors';

function* getEarliestMessageId(channelSlug) {
  const msgsMap = yield select(selectEntities, 'messages');
  const sortedMsgs = Object.values(msgsMap).filter(msg => (
    msg.channelSlug === channelSlug
  )).sort((a, b) => a.id - b.id);

  const { id } = sortedMsgs[0] || {};

  return id;
}

function* messageIndex({ channelSlug }) {
  try {
    const channel = yield select(selectEntityBySlug, 'channels', channelSlug);
    let apiUrl = `channels/${channelSlug}/messages`;

    if (channel.messages.length) {
      const firstMsgId = yield getEarliestMessageId(channelSlug);
      apiUrl += `/${firstMsgId}`;
    }

    const messages = yield call(api.apiFetch, apiUrl);
    yield put(actions.fetchMessages.receive(messages));
  } catch (error) {
    yield put(actions.fetchMessages.failure(error));
  }
}

function* messageShow({ messageSlug }) {
  try {
    const message = yield call(api.apiFetch, `message_convos/${messageSlug}`);
    yield put(actions.fetchMessage.receive(message));
  } catch (error) {
    yield put(actions.fetchMessage.failure(error));
  }
}

function* messageCreate({ message }) {
  try {
    yield call(api.apiCreate, 'messages', message);
  } catch (error) {
    yield put(actions.createMessage.failure(error));
  }
}

function* messageUpdate({ message }) {
  try {
    yield call(api.apiUpdate, `messages/${message.slug}`, message);
  } catch (error) {
    yield put(actions.updateMessage.failure(error));
  }
}

function* closeDrawerIfOpen(slug) {
  const drawer = yield select(selectUIByDisplay, 'drawer');
  const { drawerType, drawerSlug } = drawer;

  if (drawerType === 'convo' && drawerSlug === slug) {
    const chatPathUrl = yield select(getChatPathUrl);
    yield put(navigate(chatPathUrl));
  }
}

function* messageDestroy({ messageSlug }) {
  try {
    const message = yield call(api.apiDestroy, `messages/${messageSlug}`);

    if (!message.parentMessageId) {
      yield closeDrawerIfOpen(message.slug);
    }
  } catch (error) {
    yield put(actions.deleteMessage.failure(error));
  }
}

function* watchMessageIndexRequest() {
  yield takeLatest(MESSAGE.INDEX.REQUEST, messageIndex);
}

function* watchMessageShowRequest() {
  yield takeLatest(MESSAGE.SHOW.REQUEST, messageShow);
}

function* watchMessageCreateRequest() {
  yield takeLatest(MESSAGE.CREATE.REQUEST, messageCreate);
}

function* watchMessageUpdateRequest() {
  yield takeLatest(MESSAGE.UPDATE.REQUEST, messageUpdate);
}

function* watchMessageDestroyRequest() {
  yield takeLatest(MESSAGE.DESTROY.REQUEST, messageDestroy);
}

export default function* messageSaga() {
  yield all([
    fork(watchMessageIndexRequest),
    fork(watchMessageShowRequest),
    fork(watchMessageCreateRequest),
    fork(watchMessageUpdateRequest),
    fork(watchMessageDestroyRequest),
  ]);
}
