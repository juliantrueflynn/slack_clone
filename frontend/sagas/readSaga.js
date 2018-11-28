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
  CLEAR_UNREADS,
} from '../actions/actionTypes';
import { apiCreate, apiUpdate } from '../util/apiUtil';
import * as actions from '../actions/readActions';
import { selectUIByDisplay, selectEntityBySlug, selectEntities } from '../reducers/selectors';

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

function* fetchClearUnreads({ channelSlug }) {
  const currChannel = yield select(selectEntityBySlug, 'channels', channelSlug);
  const { readId } = currChannel;
  yield fetchUpdate({ readId });
}

function* fetchMessageThread({ messages: { messages } }) {
  const parent = yield select(selectEntityBySlug, 'messages', messages[0].slug);

  if (parent.hasUnreads) {
    if (parent.readId) {
      yield put(actions.updateRead.request(parent.readId));
    } else {
      const readProps = { readableId: parent.id, readableType: 'Message' };
      yield put(actions.createRead.request(readProps));
    }
  }
}

function* fetchChannelPage({ messages: { channel } }) {
  const currChannel = yield select(selectEntityBySlug, 'channels', channel.slug);

  if (currChannel.hasUnreads) {
    if (currChannel.readId) {
      yield put(actions.updateRead.request(currChannel.readId));
    } else {
      const newRead = { readableId: channel.id, readableType: 'Channel' };
      yield put(actions.createRead.request(newRead));
    }
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
      if (drawer.drawerType === 'convo') {
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

function* watchCreated() {
  yield takeLatest(READ.CREATE.REQUEST, fetchCreate);
}

function* watchUpdated() {
  yield takeLatest(READ.UPDATE.REQUEST, fetchUpdate);
}

function* watchClearUnreads() {
  yield takeLatest(CLEAR_UNREADS, fetchClearUnreads);
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
    fork(watchCreated),
    fork(watchUpdated),
    fork(watchClearUnreads),
    fork(watchMessageThread),
    fork(watchChannelPage),
    fork(watchUserThreadIndex),
    fork(watchMessageCreate),
  ]);
}
