import {
  all,
  fork,
  put,
  takeLatest,
  select,
  call,
} from 'redux-saga/effects';
import { READ, MESSAGE } from '../actions/actionTypes';
import { apiCreate, apiUpdate, apiDestroy } from '../util/apiUtil';
import {
  createRead,
  updateRead,
  destroyRead,
  createUnread,
} from '../actions/readActions';
import { getChannelsMap, selectEntityBySlug } from '../reducers/selectors';
import {
  getReadProps,
  getUnread,
  isCurrentUserInView,
  isCurrentUserNotInConvo,
} from '../util/readUtil';

function* fetchCreate({ read: { slug, ...read } }) {
  try {
    const response = yield call(apiCreate, 'read', read);
    yield put(createRead.receive(response));
  } catch (error) {
    yield put(createRead.failure(error));
  }
}

function* fetchUpdate({ read }) {
  try {
    const response = yield call(apiUpdate, 'read', read);
    yield put(updateRead.receive(response));
  } catch (error) {
    yield put(updateRead.failure(error));
  }
}

function* fetchDestroy({ read: { readableId, readableType, slug } }) {
  try {
    yield call(apiDestroy, `read_destroy/${readableId}/readable_type/${readableType}`);
    yield put(destroyRead.receive({ readableId, readableType, slug }));
  } catch (error) {
    yield put(destroyRead.failure(error));
  }
}

function* createOrUpdateRead(readProps) {
  const readAction = readProps.lastRead ? updateRead : createRead;
  yield put(readAction.request(readProps));
}

function* readViewedEntity(readProps) {
  const unread = yield getUnread(readProps);

  if (unread.hasUnreads) {
    yield createOrUpdateRead(unread);
  }
}

function* fetchMessageThread({ messages: { messages } }) {
  if (messages.length <= 1) {
    return;
  }

  const [message] = messages;
  const readableId = message.parentMessageId || message.id;
  const slug = message.parentMessageSlug || message.slug;

  yield readViewedEntity({ readableType: 'Message', readableId, slug });
}

function* fetchChannelPage({ messages: { channel } }) {
  const channelsMap = yield select(getChannelsMap);
  const { slug, id: readableId, isSub } = channelsMap[channel.slug] || {};

  if (isSub) {
    yield readViewedEntity({ readableType: 'Channel', readableId, slug });
  }
}

function* loadCreateMessageRead({ message: msg }) {
  const isNotInConvo = yield isCurrentUserNotInConvo(msg.authors);

  if (msg.entityType !== 'entry' || (msg.parentMessageSlug && isNotInConvo)) {
    return;
  }

  const read = getReadProps(msg);
  const { slug: messageSlug, createdAt: lastActive } = msg;
  const unread = yield getUnread({ messageSlug, lastActive, ...read });

  if (yield call(isCurrentUserInView, read)) {
    yield createOrUpdateRead({ ...unread, ...read });
  } else {
    yield put(createUnread({ ...unread, hasUnreads: true }));
  }
}

function* loadDestroyConvoRead({ message }) {
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

function* watchCreated() {
  yield takeLatest(READ.CREATE.REQUEST, fetchCreate);
}

function* watchUpdated() {
  yield takeLatest(READ.UPDATE.REQUEST, fetchUpdate);
}

function* watchDestroyed() {
  yield takeLatest(READ.DESTROY.REQUEST, fetchDestroy);
}

function* watchMessageThread() {
  yield takeLatest(MESSAGE.SHOW.RECEIVE, fetchMessageThread);
}

function* watchChannelPage() {
  yield takeLatest(MESSAGE.INDEX.RECEIVE, fetchChannelPage);
}

function* watchMessageCreate() {
  yield takeLatest(MESSAGE.CREATE.RECEIVE, loadCreateMessageRead);
}

function* watchMessageDestroy() {
  yield takeLatest(MESSAGE.DESTROY.RECEIVE, loadDestroyConvoRead);
}

export default function* unreadSaga() {
  yield all([
    fork(watchCreated),
    fork(watchUpdated),
    fork(watchDestroyed),
    fork(watchMessageThread),
    fork(watchChannelPage),
    fork(watchMessageCreate),
    fork(watchMessageDestroy),
  ]);
}
