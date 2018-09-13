import {
  all,
  fork,
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';
import { UNREAD, MESSAGE } from '../actions/actionTypes';
import * as api from '../util/apiUtil';
import * as actions from '../actions/unreadActions';

function* fetchIndex({ workspaceSlug }) {
  try {
    const received = yield call(api.apiFetch, `workspaces/${workspaceSlug}/unreads`);
    yield put(actions.fetchUnreads.receive(received));
  } catch (error) {
    yield put(actions.fetchUnreads.failure(error));
  }
}

function* fetchUpdate({ unread }) {
  try {
    yield call(api.apiUpdate, 'unread', unread);
  } catch (error) {
    yield put(actions.updateUnread.failure(error));
  }
}

function* fetchSetUnread({ message }) {
  const unread = { activeAt: message.createdAt };
  if (message.parentMessageId) {
    unread.unreadableId = message.parentMessageId;
    unread.unreadableType = 'Message';
  } else {
    unread.unreadableId = message.channelId;
    unread.unreadableType = 'Channel';
  }

  yield put(actions.updateUnread.request(unread));
}

// function* fetchSetUnread({ message }) {
//   const currUser = yield select(selectCurrentUser);
//   const currChannel = yield select(selectCurrentChannel);
//   const currMessage = yield select(selectCurrentMessage);
//   const messageChat = yield select(selectChatBySlug, message.channelSlug);

//   let setUnread = true;
//   if (message.authorSlug === currUser.slug) {
//     setUnread = false;
//   } else if ((currMessage && currMessage.unreadId) || (messageChat && messageChat.unreadId)) {
//     setUnread = false;
//   } else if (currMessage && currMessage.slug === message.parentMessageSlug) {
//     setUnread = false;
//   } else if (currChannel && currChannel.slug === message.channelSlug) {
//     setUnread = false;
//   }

//   if (setUnread) {
//     const unreadProps = {};
//     if (message.parentMessageId) {
//       unreadProps.unreadableId = message.id;
//       unreadProps.unreadableType = 'Message';
//     } else {
//       unreadProps.unreadableId = message.channelId;
//       unreadProps.unreadableType = 'Channel';
//     }

//     yield put(actions.createUnread({ ...unreadProps }));
//   }
// }

function* watchIndex() {
  yield takeLatest(UNREAD.INDEX.REQUEST, fetchIndex);
}

function* watchUpdate() {
  yield takeLatest(UNREAD.UPDATE.REQUEST, fetchUpdate);
}

function* watchUnread() {
  yield takeLatest(MESSAGE.CREATE.RECEIVE, fetchSetUnread);
}

export default function* unreadSaga() {
  yield all([
    fork(watchIndex),
    fork(watchUpdate),
    fork(watchUnread),
  ]);
}
