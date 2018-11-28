import {
  all,
  fork,
  takeLatest,
  call,
  put,
  select,
} from 'redux-saga/effects';
import { MESSAGE, UNREAD } from '../actions/actionTypes';
import { apiUpdate, apiCreate, apiFetch } from '../util/apiUtil';
import * as actions from '../actions/unreadActions';
import { selectCurrentUser } from '../reducers/selectors';

function* fetchIndex({ workspaceSlug }) {
  try {
    const received = yield call(apiFetch, `workspaces/${workspaceSlug}/user_unreads`);
    yield put(actions.fetchUnreads.receive(received));
  } catch (error) {
    yield put(actions.fetchUnreads.failure(error));
  }
}

function* loadCreateUnread({ unread }) {
  try {
    const created = yield call(apiCreate, 'unreads', unread);
    yield put(actions.createUnread.receive(created));
  } catch (error) {
    yield put(actions.createUnread.failure(error));
  }
}

function* loadUpdateUnread({ unread }) {
  try {
    const updated = yield call(apiUpdate, `unreads/${unread.id}`, unread);
    yield put(actions.updateUnread.receive(updated));
  } catch (error) {
    yield put(actions.updateUnread.failure(error));
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
      yield put(actions.updateUnread.request(unreadProps));
    } else {
      yield put(actions.createUnread.request(unreadProps));
    }
  }
}

function* watchIndex() {
  yield takeLatest(UNREAD.INDEX.REQUEST, fetchIndex);
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
    fork(watchIndex),
    fork(watchCreateUnread),
    fork(watchUpdateUnread),
    fork(watchCreateMessage),
  ]);
}
