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
import * as actions from '../actions/readActions';
import { getChannelsMap } from '../reducers/selectors';
import {
  getReadProps,
  getUnread,
  isCurrentUserInView,
  isCurrentUserNotInConvo,
} from '../util/readUtil';

function* fetchCreate({ read: { slug, ...read } }) {
  try {
    const created = yield call(apiCreate, 'read', read);
    yield put(actions.createRead.receive(created));
  } catch (error) {
    yield put(actions.createRead.failure(error));
  }
}

function* fetchUpdate({ read }) {
  try {
    const updated = yield call(apiUpdate, 'read', read);
    yield put(actions.updateRead.receive(updated));
  } catch (error) {
    yield put(actions.updateRead.failure(error));
  }
}

function* fetchDestroy({ read: { readableId, readableType, slug } }) {
  try {
    const apiForType = readableType.toLowerCase();
    yield call(apiDestroy, `${apiForType}_reads/${readableId}`);
    yield put(actions.destroyRead.receive({ readableId, readableType, slug }));
  } catch (error) {
    yield put(actions.destroyRead.failure(error));
  }
}

function* createOrUpdateRead(readProps) {
  const actionType = readProps.lastRead ? 'update' : 'create';

  yield put(actions[`${actionType}Read`].request(readProps));
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

function* loadCreateMessageRead({ message }) {
  const { message: msg } = message;
  const isNotInConvo = yield isCurrentUserNotInConvo(message);

  if (msg.entityType !== 'entry' || (msg.parentMessageSlug && isNotInConvo)) {
    return;
  }

  const read = getReadProps(msg);
  const unread = yield getUnread({ messageSlug: msg.slug, lastActive: msg.createdAt, ...read });
  const isUserInView = yield isCurrentUserInView(read);

  if (isUserInView) {
    yield createOrUpdateRead({ ...unread, ...read });
  } else {
    yield put(actions.createUnread({ ...unread, hasUnreads: true }));
  }
}

function* loadDestroyConvoRead({ message: { id: readableId, parentMessageSlug, slug } }) {
  if (parentMessageSlug) {
    return;
  }

  yield put(actions.destroyRead.request({ readableType: 'Message', readableId, slug }));
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

export default function* readSaga() {
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
