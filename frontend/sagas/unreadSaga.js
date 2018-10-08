import {
  all,
  fork,
  takeLatest,
  call,
  put,
  select,
} from 'redux-saga/effects';
import { CLEAR_UNREADS, MESSAGE, UNREAD } from '../actions/actionTypes';
import { fetchUpdate } from './readSaga';
import { selectEntityBySlug, selectCurrentUser } from '../reducers/selectors';
import { apiUpdate, apiCreate } from '../util/apiUtil';
import { updateUnread, createUnread } from '../actions/unreadActions';

function* fetchClearUnreads({ channelSlug }) {
  const currChannel = yield select(selectEntityBySlug, 'channels', channelSlug);
  const { readId } = currChannel;
  yield fetchUpdate({ readId });
}

function* loadCreateUnread({ unread }) {
  try {
    const created = yield call(apiCreate, 'unreads', unread);
    yield put(createUnread.receive(created));
  } catch (error) {
    yield put(createUnread.failure(error));
  }
}

function* loadUpdateUnread({ unread }) {
  try {
    const updated = yield call(apiUpdate, `unreads/${unread.id}`, unread);
    yield put(updateUnread.receive(updated));
  } catch (error) {
    yield put(updateUnread.failure(error));
  }
}

function* loadNewUnread({ message: { message, unread, authors } }) {
  if (message.entityType !== 'entry') {
    return;
  }

  const currUser = yield select(selectCurrentUser);
  const unreadProps = {
    activeAt: message.createdAt,
    unreadableId: message.channelId,
    unreadableType: 'Channel',
  };

  let isInConvo = true;
  if (message.parentMessageId) {
    isInConvo = authors.some(authorSlug => authorSlug === currUser.slug);
    unreadProps.unreadableType = 'Message';
    unreadProps.unreadableId = message.parentMessageId;
  }

  if (isInConvo) {
    if (unread) {
      unreadProps.id = unread.id;
      yield put(updateUnread.request(unreadProps));
    } else {
      yield put(createUnread.request(unreadProps));
    }
  }
}

function* watchClearUnreads() {
  yield takeLatest(CLEAR_UNREADS, fetchClearUnreads);
}

function* watchCreateUnread() {
  yield takeLatest(UNREAD.CREATE.REQUEST, loadCreateUnread);
}

function* watchUpdateUnread() {
  yield takeLatest(UNREAD.UPDATE.REQUEST, loadUpdateUnread);
}

function* watchCreateMessage() {
  yield takeLatest(MESSAGE.CREATE.RECEIVE, loadNewUnread);
}

export default function* unreadSaga() {
  yield all([
    fork(watchClearUnreads),
    fork(watchCreateUnread),
    fork(watchUpdateUnread),
    fork(watchCreateMessage),
  ]);
}
