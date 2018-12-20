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
import { selectUIByDisplay, selectEntityBySlug, getChannelsMap } from '../reducers/selectors';

function* fetchCreate({ slug, ...read }) {
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

function* createOrUpdateRead(read, unread) {
  const actionType = unread && unread.lastRead ? 'update' : 'create';

  try {
    yield put(actions[`${actionType}Read`].request(read));
  } catch (error) {
    yield put(actions[`${actionType}Read`].failure(error));
  }
}

function* readViewedEntity(read, slug) {
  const unread = yield select(selectEntityBySlug, 'unreads', slug);

  if (unread && unread.hasUnreads) {
    yield createOrUpdateRead(read, unread);
  }
}

function* fetchMessageThread({ messages: { messages } }) {
  if (messages.length <= 1) {
    return;
  }

  const [message] = messages;
  const convoId = message.parentMessageId || message.id;
  const convoSlug = message.parentMessageSlug || message.slug;
  const read = { readableType: 'Message', readableId: convoId };
  yield readViewedEntity(read, convoSlug);
}

function* fetchChannelPage({ messages: { channel } }) {
  const channelsMap = yield select(getChannelsMap);
  const ch = channelsMap[channel.slug];

  if (ch.isSub) {
    const read = { readableType: 'Channel', readableId: ch.id };
    yield readViewedEntity(read, channel.slug);
  }
}

function* loadMessageRead({ message: msg }) {
  if (msg.entityType !== 'entry') {
    return;
  }

  const slug = msg.parentMessageSlug || msg.channelSlug;
  const read = {
    readableType: msg.parentMessageSlug ? 'Message' : 'Channel',
    readableId: msg.parentMessageId || msg.channelId,
  };

  let currPageSlug = yield select(selectUIByDisplay, 'displayChatPath');
  let isCurrPage = currPageSlug === slug;

  if (read.readableType === 'Message') {
    if (currPageSlug === 'threads') {
      isCurrPage = true;
    } else {
      const drawer = yield select(selectUIByDisplay, 'drawer');

      if (drawer.drawerType === 'convo') {
        currPageSlug = drawer.drawerSlug;
        isCurrPage = currPageSlug === slug;
      }
    }
  }

  const unread = yield select(selectEntityBySlug, 'unreads', slug);

  if (isCurrPage) {
    yield createOrUpdateRead(read, unread);
  } else {
    const lastRead = unread && unread.lastRead;
    const unreadProps = { slug, lastRead, lastActive: msg.createdAt };
    yield put(actions.createUnread(read.readableType, unreadProps, msg.slug));
  }
}

function* loadDestroyConvoRead({ message: { id: readableId, parentMessageId, slug } }) {
  try {
    if (parentMessageId) {
      return;
    }

    yield put(actions.destroyRead.request({ readableType: 'Message', readableId, slug }));
  } catch (error) {
    yield put(actions.destroyRead.failure(error));
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
  yield takeLatest(MESSAGE.CREATE.RECEIVE, loadMessageRead);
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
