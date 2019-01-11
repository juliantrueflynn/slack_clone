import {
  all,
  fork,
  put,
  takeLatest,
  select,
  call,
} from 'redux-saga/effects';
import { READ, MESSAGE, CHAT_PATH_UPDATE } from '../actions/actionTypes';
import { apiCreate, apiUpdate, apiDestroy } from '../util/apiUtil';
import { updateRead, destroyRead, updateUnread } from '../actions/readActions';
import { selectEntityBySlug, getChatPage } from '../reducers/selectors';
import {
  getReadProps,
  getUnread,
  isCurrentUserInView,
  isCurrentUserNotInConvo,
} from '../util/readUtil';

function* readUpdate({ read }) {
  try {
    const apiCall = read.lastRead ? apiUpdate : apiCreate;
    const response = yield call(apiCall, 'read', read);
    yield put(updateRead.receive(response));
  } catch (error) {
    yield put(updateRead.failure(error));
  }
}

function* readDestroy({ read: { readableId, readableType, slug } }) {
  try {
    yield call(apiDestroy, `read_destroy/${readableId}/readable_type/${readableType}`);
    yield put(destroyRead.receive({ readableId, readableType, slug }));
  } catch (error) {
    yield put(destroyRead.failure(error));
  }
}

function* readViewedEntity(readProps) {
  const unread = yield getUnread(readProps);

  if (unread.hasUnreads) {
    yield put(updateRead.request(unread));
  }
}

function* readUpdateByChat({ chatPath }) {
  const channel = yield select(getChatPage, chatPath);
  const { slug, id: readableId, isSub } = channel || {};

  if (channel && isSub) {
    yield readViewedEntity({ readableType: 'Channel', readableId, slug });
  }
}

function* readUpdateByMessageShow({ messages: { messages } }) {
  if (messages.length <= 1) {
    return;
  }

  const [message] = messages;
  const readableId = message.parentMessageId || message.id;
  const slug = message.parentMessageSlug || message.slug;

  yield readViewedEntity({ readableType: 'Message', readableId, slug });
}

function* readUpdateByMessageCreate({ message: msg }) {
  const isNotInConvo = yield isCurrentUserNotInConvo(msg.authors);

  if (msg.entityType !== 'entry' || (msg.parentMessageSlug && isNotInConvo)) {
    return;
  }

  const read = getReadProps(msg);
  const { slug: messageSlug, createdAt: lastActive } = msg;
  const unread = yield getUnread({ messageSlug, lastActive, ...read });

  if (yield call(isCurrentUserInView, read)) {
    yield put(updateRead.request({ ...unread, ...read }));
  } else {
    yield put(updateUnread({ ...unread, hasUnreads: true }));
  }
}

function* readDestroyByConvo({ message }) {
  const { parentMessageId: readableId, parentMessageSlug: slug } = message;
  const unread = yield select(selectEntityBySlug, 'unreads', slug);

  if (!readableId || !unread) {
    return;
  }

  const isUserNotInConvo = yield isCurrentUserNotInConvo(message.authors);

  if (isUserNotInConvo || (!isUserNotInConvo && message.authors.length === 1)) {
    yield put(destroyRead.request({ readableType: 'Message', readableId, slug }));
  }
}

function* watchReadUpdateRequest() {
  yield takeLatest(READ.UPDATE.REQUEST, readUpdate);
}

function* watchReadDestroyRequest() {
  yield takeLatest(READ.DESTROY.REQUEST, readDestroy);
}

function* watchChannelShowRequest() {
  yield takeLatest(CHAT_PATH_UPDATE, readUpdateByChat);
}

function* watchMessageThread() {
  yield takeLatest(MESSAGE.SHOW.RECEIVE, readUpdateByMessageShow);
}

function* watchMessageCreateRequest() {
  yield takeLatest(MESSAGE.CREATE.RECEIVE, readUpdateByMessageCreate);
}

function* watchMessageDestroyRequest() {
  yield takeLatest(MESSAGE.DESTROY.RECEIVE, readDestroyByConvo);
}

export default function* readSaga() {
  yield all([
    fork(watchReadUpdateRequest),
    fork(watchReadDestroyRequest),
    fork(watchMessageThread),
    fork(watchChannelShowRequest),
    fork(watchMessageCreateRequest),
    fork(watchMessageDestroyRequest),
  ]);
}
