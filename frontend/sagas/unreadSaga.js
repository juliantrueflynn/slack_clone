import {
  all,
  fork,
  takeLatest,
  call,
  put,
  select,
} from 'redux-saga/effects';
import { READ, CLEAR_UNREADS, USER_THREAD } from '../actions/actionTypes';
import { apiFetch, apiUpdate, apiCreate } from '../util/apiUtil';
import { fetchUnreads } from '../actions/readActions';
import { selectEntityBySlug, selectEntities } from '../reducers/selectors';

function* fetchIndex({ workspaceSlug }) {
  try {
    const received = yield call(apiFetch, `workspaces/${workspaceSlug}/user_unreads`);
    yield put(fetchUnreads.receive(received));
  } catch (error) {
    yield put(fetchUnreads.failure(error));
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

function* fetchClearUnreads({ channelSlug }) {
  const currChannel = yield select(selectEntityBySlug, 'channels', channelSlug);
  const { readId } = currChannel;
  yield call(apiUpdate, `reads/${readId}`);
}

function* watchIndex() {
  yield takeLatest(READ.INDEX.REQUEST, fetchIndex);
}

function* watchUserThreadIndex() {
  yield takeLatest(USER_THREAD.INDEX.REQUEST, fetchUserThreadIndexPage);
}

function* watchClearUnreads() {
  yield takeLatest(CLEAR_UNREADS, fetchClearUnreads);
}

export default function* unreadSaga() {
  yield all([
    fork(watchIndex),
    fork(watchUserThreadIndex),
    fork(watchClearUnreads),
  ]);
}
