import {
  all,
  fork,
  put,
  takeLatest,
  select,
  call,
} from 'redux-saga/effects';
import {
  READ,
  MESSAGE,
  UNREAD,
  USER_THREAD,
} from '../actions/actionTypes';
import { apiCreate, apiUpdate, apiFetch } from '../util/apiUtil';
import * as actions from '../actions/readActions';
import {
  selectUIByDisplay,
  selectEntityBySlug,
  selectEntities,
  selectCurrentUser,
} from '../reducers/selectors';
import parseDateToMilliseconds from '../util/dateUtil';

function* fetchIndex({ workspaceSlug }) {
  try {
    const received = yield call(apiFetch, `workspaces/${workspaceSlug}/user_unreads`);
    yield put(actions.fetchUnreads.receive(received));
  } catch (error) {
    yield put(actions.fetchUnreads.failure(error));
  }
}

function* fetchCreate({ read }) {
  try {
    const created = yield call(apiCreate, 'reads', read);
    yield put(actions.createRead.receive(created));
  } catch (error) {
    yield put(actions.createRead.failure(error));
  }
}

export function* fetchUpdate({ readId }) {
  try {
    const updated = yield call(apiUpdate, `reads/${readId}`);
    yield put(actions.updateRead.receive(updated));
  } catch (error) {
    yield put(actions.updateRead.failure(error));
  }
}

function* fetchMessageThread({ message: { message, childMessages, read } }) {
  const currUser = yield select(selectCurrentUser);
  const lastEntry = childMessages[childMessages.length - 1];
  const lastActive = lastEntry && parseDateToMilliseconds(lastEntry.createdAt);
  const lastRead = read && parseDateToMilliseconds(read.accessedAt);

  let hasUnread = true;
  if (!childMessages.length) {
    hasUnread = false;
  } else if (lastEntry && lastRead > lastActive) {
    hasUnread = false;
  }

  childMessages.unshift(message);
  const isNotInConvo = childMessages.every(msg => msg.authorSlug !== currUser.slug);
  if (isNotInConvo) {
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
    if (currChannel.hasUnreads) {
      yield put(actions.updateRead.request(read.id));
    }
  } else {
    const newRead = { readableId: channel.id, readableType: 'Channel' };
    yield put(actions.createRead.request(newRead));
  }
}

function* fetchUserThreadIndexPage() {
  const messages = yield select(selectEntities, 'messages');
  const unreadMessages = Object.values(messages).filter(message => message.hasUnreads);

  yield all(unreadMessages.map((parent) => {
    const { readId, id: readableId } = parent;

    if (readId) {
      return call(apiUpdate, `reads/${parent.readId}`);
    }

    const read = { readableId, readableType: 'Message' };
    return call(apiCreate, 'reads', read);
  }));
}

function* setMessageRead({ unread }) {
  const read = { readableId: unread.unreadableId, readableType: unread.unreadableType };
  let entity;
  let currSlug = yield select(selectUIByDisplay, 'displayChannelSlug');
  let isCurrPage = false;
  let isInConvo = true;

  if (read.readableType === 'Channel') {
    entity = yield select(selectEntityBySlug, 'channels', unread.slug);
    isCurrPage = currSlug && currSlug === unread.slug;
  } else {
    entity = yield select(selectEntityBySlug, 'messages', unread.slug);

    if (entity && entity.authors) {
      isInConvo = entity.authors.some(authorSlug => authorSlug === unread.userSlug);
    }

    if (currSlug === 'threads') {
      isCurrPage = true;
    } else {
      const drawer = yield select(selectUIByDisplay, 'drawer');
      if (drawer.drawerType === 'thread') {
        currSlug = drawer.drawerSlug;
        isCurrPage = currSlug === unread.slug;
      }
    }
  }

  if (isInConvo && entity && isCurrPage) {
    read.id = entity.readId;

    if (read.id) {
      yield put(actions.updateRead.request(read.id));
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

function* watchUserThreadIndex() {
  yield takeLatest(USER_THREAD.INDEX.REQUEST, fetchUserThreadIndexPage);
}

function* watchMessageCreate() {
  yield all([
    takeLatest(UNREAD.UPDATE.RECEIVE, setMessageRead),
    takeLatest(UNREAD.CREATE.RECEIVE, setMessageRead),
  ]);
}

export default function* readSaga() {
  yield all([
    fork(watchIndex),
    fork(watchCreated),
    fork(watchUpdated),
    fork(watchMessageThread),
    fork(watchChannelPage),
    fork(watchUserThreadIndex),
    fork(watchMessageCreate),
  ]);
}
