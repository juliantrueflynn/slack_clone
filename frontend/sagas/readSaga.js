import {
  all,
  fork,
  put,
  takeLatest,
  select,
  call,
} from 'redux-saga/effects';
import { READ, MESSAGE } from '../actions/actionTypes';
import { apiCreate, apiUpdate, apiFetch } from '../util/apiUtil';
import * as actions from '../actions/readActions';
import { selectWorkspaceSlug, selectCurrentChannel } from '../reducers/selectors';

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
    const workspaceSlug = yield select(selectWorkspaceSlug);
    const created = yield call(apiCreate, `workspaces/${workspaceSlug}/reads`, read);
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

function* fetchMessageThread({ message: { message, read, childMessages } }) {
  const lastEntry = childMessages[childMessages.length - 1];
  const lastActive = lastEntry && Date.parse(lastEntry.createdAt);
  const lastRead = read && Date.parse(read.accessedAt);

  let hasUnread = true;
  if (!childMessages.length) {
    hasUnread = false;
  } else if (lastEntry && lastActive < lastRead) {
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

function* fetchChannelPage() {
  const channel = yield select(selectCurrentChannel);

  if (channel.hasUnreads) {
    yield put(actions.updateRead.request(channel.readId));
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

export default function* readSaga() {
  yield all([
    fork(watchIndex),
    fork(watchCreated),
    fork(watchUpdated),
    fork(watchMessageThread),
    fork(watchChannelPage),
  ]);
}
