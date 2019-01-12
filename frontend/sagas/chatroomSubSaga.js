import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { CHATROOM_SUB, MESSAGE, CHAT_PATH_UPDATE } from '../actions/actionTypes';
import { createChatroomSub, updateChatroomSub, destroyChatroomSub } from '../actions/chatroomActions';
import { apiCreate, apiDestroy, apiUpdate } from '../util/apiUtil';
import { selectEntities, getCurrentUser, selectEntityBySlug } from '../reducers/selectors';
import { updateRead, destroyRead } from '../actions/readActions';

function* callReadAction(actionCaller, sub) {
  if (sub && sub.chatroomId) {
    yield put(actionCaller.request({ readableId: sub.chatroomId, readableType: 'Chatroom' }));
  }
}

function* chatroomSubCreate({ chatroomSub }) {
  try {
    const response = yield call(apiCreate, 'chatroom_subs', chatroomSub);
    yield callReadAction(updateRead, response);
  } catch (error) {
    yield put(createChatroomSub.failure(error));
  }
}

function* chatroomSubUpdate({ chatroomSlug }) {
  try {
    const response = yield call(apiUpdate, `chatrooms/${chatroomSlug}/chatroom_sub`);
    yield put(updateChatroomSub.receive(response));
  } catch (error) {
    yield put(updateChatroomSub.failure(error));
  }
}

function* fetchDestroy({ chatroomSlug }) {
  try {
    const response = yield call(apiDestroy, `chatrooms/${chatroomSlug}/chatroom_sub`);
    yield callReadAction(destroyRead, response);
  } catch (error) {
    yield put(destroyChatroomSub.failure(error));
  }
}

function* updateDmChatSubBySlug(chatroomSlug) {
  const chatroom = yield select(selectEntityBySlug, 'chatrooms', chatroomSlug);

  if (!chatroom || !chatroom.hasDm) {
    return;
  }

  try {
    const user = yield select(getCurrentUser);
    const subsMap = yield select(selectEntities, 'chatroomSubs');
    const userSub = chatroom.subs.map(id => subsMap[id]).filter(sub => sub.userId === user.id)[0];

    if (userSub && !userSub.inSidebar) {
      yield put(updateChatroomSub.request(chatroomSlug));
    }
  } catch (error) {
    yield put(updateChatroomSub.failure(error));
  }
}

function* dmChatSubUpdateByChatPath({ chatPath }) {
  if (chatPath !== 'unreads' || chatPath !== 'threads') {
    yield updateDmChatSubBySlug(chatPath);
  }
}

function* dmChatSubUpdateByMessage({ message }) {
  yield updateDmChatSubBySlug(message.chatroomSlug);
}

function* watchChannelSubCreateRequest() {
  yield takeLatest(CHATROOM_SUB.CREATE.REQUEST, chatroomSubCreate);
}

function* watchChannelSubUpdateRequest() {
  yield takeLatest(CHATROOM_SUB.UPDATE.REQUEST, chatroomSubUpdate);
}

function* watchChannelSubDestroyRequest() {
  yield takeLatest(CHATROOM_SUB.DESTROY.REQUEST, fetchDestroy);
}

function* watchMessageIndexReceive() {
  yield takeLatest(CHAT_PATH_UPDATE, dmChatSubUpdateByChatPath);
}

function* watchMessageCreateReceive() {
  yield takeLatest(MESSAGE.CREATE.RECEIVE, dmChatSubUpdateByMessage);
}

export default function* chatroomSubSaga() {
  yield all([
    fork(watchChannelSubCreateRequest),
    fork(watchChannelSubUpdateRequest),
    fork(watchChannelSubDestroyRequest),
    fork(watchMessageIndexReceive),
    fork(watchMessageCreateReceive),
  ]);
}
