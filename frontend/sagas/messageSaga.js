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
import { navigate } from '../actions/uiActions';
import { destroyRead } from '../actions/readActions';
import * as api from '../util/apiUtil';
import {
  selectUIByDisplay,
  selectEntityBySlug,
  getConvoBySlug,
  getChatPathUrl,
} from '../reducers/selectors';

function* fetchIndex({ channelSlug }) {
  try {
    const channel = yield select(selectEntityBySlug, 'channels', channelSlug);
    let apiUrl = `channels/${channelSlug}/messages`;

    if (channel.lastFetched) {
      apiUrl += `/${channel.lastFetched}`;
    }

    const messages = yield call(api.apiFetch, apiUrl);
    yield put(actions.fetchMessages.receive(messages));
  } catch (error) {
    yield put(actions.fetchMessages.failure(error));
  }
}

function* fetchHistoryIndex({ channelSlug, startDate }) {
  try {
    const apiUrl = `channels/${channelSlug}/recent_messages/${startDate}`;
    const history = yield call(api.apiFetch, apiUrl);
    yield put(actions.fetchHistory.receive(history));
  } catch (error) {
    yield put(actions.fetchHistory.failure(error));
  }
}

function* fetchMessageShow({ messageSlug }) {
  try {
    const message = yield call(api.apiFetch, `message_convos/${messageSlug}`);
    yield put(actions.fetchMessage.receive(message));
  } catch (error) {
    yield put(actions.fetchMessage.failure(error));
  }
}

function* fetchMessageCreate({ message }) {
  try {
    yield call(api.apiCreate, 'messages', message);
  } catch (error) {
    yield put(actions.createMessage.failure(error));
  }
}

function* fetchMessageUpdate({ message }) {
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

function* destroyConvoRead(reply) {
  const convo = yield select(getConvoBySlug, reply.parentMessageSlug);
  const countCurrUser = convo.slice(1).filter(msg => msg.authorSlug === reply.authorSlug);

  if (countCurrUser.length < 1) {
    const { parentMessageId: readableId, parentMessageSlug: slug } = reply;
    const read = { readableType: 'Message', readableId, slug };
    yield put(destroyRead.request(read));
  }
}

function* fetchMessageDestroy({ messageSlug }) {
  try {
    const message = yield call(api.apiDestroy, `messages/${messageSlug}`);

    if (message.parentMessageId) {
      yield destroyConvoRead(message);
    } else {
      yield closeDrawerIfOpen(message.slug);
    }
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
  yield takeLatest(MESSAGE.SHOW.REQUEST, fetchMessageShow);
}

function* watchCreateMessage() {
  yield takeLatest(MESSAGE.CREATE.REQUEST, fetchMessageCreate);
}

function* watchEditMessage() {
  yield takeLatest(MESSAGE.UPDATE.REQUEST, fetchMessageUpdate);
}

function* watchDeleteMessage() {
  yield takeLatest(MESSAGE.DESTROY.REQUEST, fetchMessageDestroy);
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
