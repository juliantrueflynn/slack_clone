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
import * as api from '../util/apiUtil';
import { selectUIByDisplay, selectEntityBySlug, selectEntities } from '../reducers/selectors';
import { destroyRead } from '../actions/readActions';

function* fetchIndex({ channelSlug }) {
  try {
    const channel = yield select(selectEntityBySlug, 'channels', channelSlug);
    let apiUrl = `channels/${channel.slug}/messages`;
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

function* closeDrawerIfOpen(slug) {
  const drawer = yield select(selectUIByDisplay, 'drawer');
  const { drawerType, drawerSlug } = drawer;

  if (drawerType === 'convo' && drawerSlug === slug) {
    const workspaceSlug = yield select(selectUIByDisplay, 'displayWorkspaceSlug');
    const channelSlug = yield select(selectUIByDisplay, 'displayChannelSlug');

    let chatPath = `messages/${channelSlug}`;
    if (channelSlug === 'unreads') {
      chatPath = 'unreads';
    } else if (channelSlug === 'threads') {
      chatPath = 'threads';
    }

    yield put(navigate(`/${workspaceSlug}/${chatPath}`));
  }
}

function* isUsersLastMessageInConvo({ parentMessageSlug, authorSlug }) {
  const msgsMap = yield select(selectEntities, 'messages');
  const parent = msgsMap[parentMessageSlug];
  const replies = parent.thread.map(slug => msgsMap[slug]);
  const countCurrUser = replies.filter(msg => msg.authorSlug === authorSlug);

  return countCurrUser.length < 1;
}

function* fetchDeleteMessage({ messageSlug }) {
  try {
    const message = yield call(api.apiDestroy, `messages/${messageSlug}`);

    if (message && !message.parentMessageId) {
      yield closeDrawerIfOpen(message.slug);
    }

    if (message.parentMessageId) {
      const isUsersLastMsgInConvo = yield isUsersLastMessageInConvo(message);

      if (isUsersLastMsgInConvo) {
        const read = {
          readableType: 'Message',
          readableId: message.parentMessageId,
          slug: message.parentMessageSlug
        };

        yield put(destroyRead.request(read));
      }
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
