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
import { selectUIByDisplay, selectEntityBySlug, selectCurrentUser } from '../reducers/selectors';

function* fetchCreate({ read }) {
  try {
    const created = yield call(apiCreate, 'reads', read);
    yield put(actions.createRead.receive(created));
  } catch (error) {
    yield put(actions.createRead.failure(error));
  }
}

function* fetchUpdate({ readId }) {
  try {
    const updated = yield call(apiUpdate, `reads/${readId}`);
    yield put(actions.updateRead.receive(updated));
  } catch (error) {
    yield put(actions.updateRead.failure(error));
  }
}

function* fetchDestroy({ readId }) {
  try {
    const destroyed = yield call(apiDestroy, `reads/${readId}`);
    yield put(actions.destroyRead.receive(destroyed));
  } catch (error) {
    yield put(actions.destroyRead.failure(error));
  }
}

const entitiesByType = type => `${type.toLowerCase()}s`;

function* createOrUpdateRead(read) {
  let actionType;

  try {
    if (read.id) {
      actionType = 'update';
      yield put(actions.updateRead.request(read.id));
    } else {
      actionType = 'create';
      yield put(actions.createRead.request(read));
    }
  } catch (error) {
    yield put(actions[`${actionType}Read`].failure(error));
  }
}

function* loadReadAction(readableType, slug) {
  const entity = yield select(selectEntityBySlug, entitiesByType(readableType), slug);

  if (!entity.hasUnreads) {
    return;
  }

  const { readId: id, id: readableId } = entity;
  const read = { readableType, readableId, id };
  yield createOrUpdateRead(read);
}

function* fetchMessageThread({ messages: { messages } }) {
  const [message] = messages;
  const convoSlug = message.parentMessageSlug || message.slug;
  yield loadReadAction('Message', convoSlug);
}

function* fetchChannelPage({ messages: { channel } }) {
  yield loadReadAction('Channel', channel.slug);
}

function* loadMessageRead({ message: { parentMessageSlug, channelSlug } }) {
  const readableType = parentMessageSlug ? 'Message' : 'Channel';
  const readSlug = parentMessageSlug || channelSlug;
  const readEntity = yield select(selectEntityBySlug, entitiesByType(readableType), readSlug);
  const read = {
    readableType,
    readableId: readEntity.id,
    id: readEntity.readId || null,
  };

  let currSlug = yield select(selectUIByDisplay, 'displayChannelSlug');
  let isCurrPage = currSlug === readSlug;

  if (readableType === 'Message') {
    if (!readEntity.isInConvo) {
      return;
    }

    if (currSlug === 'threads') {
      isCurrPage = true;
    } else {
      const drawer = yield select(selectUIByDisplay, 'drawer');

      if (drawer.drawerType === 'convo') {
        currSlug = drawer.drawerSlug;
        isCurrPage = currSlug === readSlug;
      }
    }
  } else if (readableType === 'Channel' && !read.id) {
    const currUser = yield select(selectCurrentUser);

    if (!readEntity.members.includes(currUser.slug)) {
      return;
    }
  }

  if (isCurrPage) {
    yield createOrUpdateRead(read);
  }
}

function* setMessageDestroy({ message }) {
  try {
    if (!message.parentMessageId) {
      return;
    }

    const parent = yield select(selectEntityBySlug, 'messages', message.parentMessageSlug);
    if (!parent.readId || parent.thread.length) {
      return;
    }

    if (!parent.thread.length) {
      yield put(actions.destroyRead.request(parent.readId));
    }
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
  yield takeLatest(MESSAGE.DESTROY.RECEIVE, setMessageDestroy);
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
