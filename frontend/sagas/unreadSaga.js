import {
  all,
  fork,
  put,
  takeLatest,
  select,
  call,
} from 'redux-saga/effects';
import { UNREAD, MESSAGE } from '../actions/actionTypes';
import * as api from '../util/apiUtil';
import * as actions from '../actions/unreadActions';
import {
  selectWorkspaceSlug,
  selectCurrentUser,
  selectCurrentChannel,
  selectCurrentMessage,
  selectChatBySlug,
} from '../reducers/selectors';

function* fetchIndex({ workspaceSlug }) {
  try {
    const received = yield call(api.apiFetch, `workspaces/${workspaceSlug}/unreads`);
    yield put(actions.fetchUnreads.receive(received));
  } catch (error) {
    yield put(actions.fetchUnreads.failure(error));
  }
}

function* fetchCreate({ unread }) {
  try {
    const workspaceSlug = yield select(selectWorkspaceSlug);
    const created = yield call(api.apiCreate, `workspaces/${workspaceSlug}/unreads`, unread);
    yield put(actions.createUnread.receive(created));
  } catch (error) {
    yield put(actions.createUnread.failure(error));
  }
}

function* fetchSetUnread({ message }) {
  const currUser = yield select(selectCurrentUser);
  const currChannel = yield select(selectCurrentChannel);
  const currMessage = yield select(selectCurrentMessage);
  const messageChat = yield select(selectChatBySlug, message.channelSlug);

  let setUnread = true;
  if (message.authorSlug === currUser.slug) {
    setUnread = false;
  } else if ((currMessage && currMessage.unreadId) || (messageChat && messageChat.unreadId)) {
    setUnread = false;
  } else if (currMessage && currMessage.slug === message.parentMessageSlug) {
    setUnread = false;
  } else if (currChannel && currChannel.slug === message.channelSlug) {
    setUnread = false;
  }

  if (setUnread) {
    const unreadProps = {};
    if (message.parentMessageId) {
      unreadProps.unreadableId = message.id;
      unreadProps.unreadableType = 'Message';
    } else {
      unreadProps.unreadableId = message.channelId;
      unreadProps.unreadableType = 'Channel';
    }

    yield put(actions.createUnread({ ...unreadProps }));
  }
}

function* watchIndex() {
  yield takeLatest(UNREAD.INDEX.REQUEST, fetchIndex);
}

function* watchCreate() {
  yield takeLatest(UNREAD.CREATE.RECEIVE, fetchCreate);
}

function* watchUnread() {
  yield takeLatest(MESSAGE.CREATE.RECEIVE, fetchSetUnread);
}

export default function* unreadSaga() {
  yield all([
    fork(watchIndex),
    fork(watchCreate),
    fork(watchUnread),
  ]);
}
