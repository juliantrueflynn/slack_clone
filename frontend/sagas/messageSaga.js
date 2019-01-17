import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest
} from 'redux-saga/effects';
import { MESSAGE } from '../actions/actionTypes';
import {
  fetchMessages,
  fetchMessage,
  createMessage,
  updateMessage,
  destroyMessage,
} from '../actions/messageActions';
import { navigate } from '../actions/uiActions';
import {
  apiFetch,
  apiCreate,
  apiUpdate,
  apiDestroy,
} from '../util/apiUtil';
import { getChatroomSlugUrl, getDrawer } from '../reducers/selectors';

function* messageIndex({ chatroomSlug, lastId }) {
  try {
    let apiUrl = `chatrooms/${chatroomSlug}/messages`;

    if (lastId) {
      apiUrl += `/${lastId}`;
    }

    const response = yield call(apiFetch, apiUrl);
    yield put(fetchMessages.receive(response));
  } catch (error) {
    yield put(fetchMessages.failure(error));
  }
}

function* messageShow({ messageSlug }) {
  try {
    const message = yield call(apiFetch, `message_convos/${messageSlug}`);
    yield put(fetchMessage.receive(message));
  } catch (error) {
    yield put(fetchMessage.failure(error));
  }
}

function* messageCreate({ message }) {
  try {
    yield call(apiCreate, 'messages', message);
  } catch (error) {
    yield put(createMessage.failure(error));
  }
}

function* messageUpdate({ message }) {
  try {
    yield call(apiUpdate, `messages/${message.slug}`, message);
  } catch (error) {
    yield put(updateMessage.failure(error));
  }
}

function* closeDrawerIfOpen({ slug, parentMessageId }) {
  if (!parentMessageId) {
    return;
  }

  const drawer = yield select(getDrawer);
  const { drawerType, drawerSlug } = drawer;

  if (drawerType === 'convo' && drawerSlug === slug) {
    const chatroomUrl = yield select(getChatroomSlugUrl);
    yield put(navigate(chatroomUrl));
  }
}

function* messageDestroy({ messageSlug }) {
  try {
    const response = yield call(apiDestroy, `messages/${messageSlug}`);
    yield closeDrawerIfOpen(response);
  } catch (error) {
    yield put(destroyMessage.failure(error));
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
