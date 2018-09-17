import {
  all,
  fork,
  put,
  takeLatest,
  select,
  call,
} from 'redux-saga/effects';
import { READ, MESSAGE, UNREAD } from '../actions/actionTypes';
import { apiCreate, apiUpdate, apiFetch } from '../util/apiUtil';
import * as actions from '../actions/readActions';
import { selectUIByDisplay, selectEntityBySlug, selectEntities } from '../reducers/selectors';

function* fetchIndex({ workspaceSlug }) {
  try {
    const received = yield call(apiFetch, `workspaces/${workspaceSlug}/reads`);
    yield put(actions.fetchUnreads.receive(received));
  } catch (error) {
    yield put(actions.fetchUnreads.failure(error));
  }
}

function* fetchCreate({ read }) {
  try {
    const workspaceSlug = yield select(selectUIByDisplay, 'displayWorkspaceSlug');
    const created = yield call(apiCreate, `workspaces/${workspaceSlug}/reads`, read);
    yield put(actions.createRead.receive(created));
  } catch (error) {
    yield put(actions.createRead.failure(error));
  }
}

function* fetchUpdate({ read }) {
  try {
    const updated = yield call(apiUpdate, `reads/${read.id}`, read);
    yield put(actions.updateRead.receive(updated));
  } catch (error) {
    yield put(actions.updateRead.failure(error));
  }
}

function* fetchMessageThread({ message: { message, read, childMessages } }) {
  const lastEntry = childMessages[childMessages.length - 1];
  const lastActive = lastEntry && Date.parse(lastEntry.createdAt);
  const lastRead = read && Date.parse(read.accessedAt);

  let hasUnread = true;
  if (!childMessages.length) {
    hasUnread = false;
  } else if (lastEntry && lastRead > lastActive) {
    hasUnread = false;
  }

  if (hasUnread) {
    if (read) {
      yield put(actions.updateRead.request(read.id));
    } else {
      const readProps = { readableId: message.id, readableType: 'Message' };
      yield put(actions.createRead.request(readProps));
    }
  }
}

function* fetchChannelPage({ messages: { channel } }) {
  const currChannel = yield select(selectEntityBySlug, 'channels', channel.slug);
  const read = yield select(selectEntityBySlug, 'reads', currChannel.readId);

  if (read) {
    const lastActive = Date.parse(currChannel.lastActive);
    const lastRead = Date.parse(currChannel.lastRead);

    if (lastActive > lastRead) {
      yield put(actions.updateRead.request(read));
    }
  } else {
    const newRead = { readableId: channel.id, readableType: 'Channel' };
    yield put(actions.createRead.request(newRead));
  }
}

function* setMessageRead({ unread }) {
  const { unreadableType: readableType, unreadableId: readableId, slug } = unread;
  const read = { readableId, readableType };
  let entityRead;
  let currSlug;
  if (readableType === 'Channel') {
    entityRead = yield select(selectEntityBySlug, 'channels', slug);
    currSlug = yield select(selectUIByDisplay, 'displayChannelSlug');
  } else {
    const messages = yield select(selectEntities, 'messages');
    const threadMessage = messages[slug];
    currSlug = yield select(selectUIByDisplay, 'displayMessageslug');
    entityRead = messages[threadMessage.parentMessageSlug];
  }

  if (entityRead && currSlug === slug) {
    read.id = entityRead && entityRead.readId;

    if (read.id) {
      yield put(actions.updateRead.request(read));
    } else {
      yield put(actions.createRead.request(read));
    }
  }
}

function* watchIndex() {
  yield takeLatest(READ.INDEX.REQUEST, fetchIndex);
}

function* watchCreated() {
  yield takeLatest(READ.CREATE.REQUEST, fetchCreate);
}

function* watchUpdated() {
  yield takeLatest(READ.UPDATE.REQUEST, fetchUpdate);
}

function* watchMessageThread() {
  yield takeLatest(MESSAGE.SHOW.RECEIVE, fetchMessageThread);
}

function* watchChannelPage() {
  yield takeLatest(MESSAGE.INDEX.RECEIVE, fetchChannelPage);
}

function* watchMessageCreate() {
  yield takeLatest(UNREAD.UPDATE.RECEIVE, setMessageRead);
}

export default function* readSaga() {
  yield all([
    fork(watchIndex),
    fork(watchCreated),
    fork(watchUpdated),
    fork(watchMessageThread),
    fork(watchChannelPage),
    fork(watchMessageCreate),
  ]);
}
