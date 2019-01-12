import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { CHANNEL_SUB, MESSAGE, CHAT_PATH_UPDATE } from '../actions/actionTypes';
import { createChannelSub, updateChannelSub, destroyChannelSub } from '../actions/channelActions';
import { apiCreate, apiDestroy, apiUpdate } from '../util/apiUtil';
import { selectEntities, getCurrentUser, selectEntityBySlug } from '../reducers/selectors';
import { updateRead, destroyRead } from '../actions/readActions';

function* callReadAction(actionCaller, sub) {
  if (sub && sub.channelId) {
    yield put(actionCaller.request({ readableId: sub.channelId, readableType: 'Channel' }));
  }
}

function* channelSubCreate({ channelSub }) {
  try {
    const response = yield call(apiCreate, 'chatroom_subs', channelSub);
    yield callReadAction(updateRead, response);
  } catch (error) {
    yield put(createChannelSub.failure(error));
  }
}

function* channelSubUpdate({ channelSlug }) {
  try {
    const response = yield call(apiUpdate, `channels/${channelSlug}/channel_sub`);
    yield put(updateChannelSub.receive(response));
  } catch (error) {
    yield put(updateChannelSub.failure(error));
  }
}

function* fetchDestroy({ channelSlug }) {
  try {
    const response = yield call(apiDestroy, `channels/${channelSlug}/channel_sub`);
    yield callReadAction(destroyRead, response);
  } catch (error) {
    yield put(destroyChannelSub.failure(error));
  }
}

function* updateDmChatSubBySlug(channelSlug) {
  const channel = yield select(selectEntityBySlug, 'channels', channelSlug);

  if (!channel || !channel.hasDm) {
    return;
  }

  try {
    const user = yield select(getCurrentUser);
    const subsMap = yield select(selectEntities, 'channelSubs');
    const userSub = channel.subs.map(id => subsMap[id]).filter(sub => sub.userId === user.id)[0];

    if (userSub && !userSub.inSidebar) {
      yield put(updateChannelSub.request(channelSlug));
    }
  } catch (error) {
    yield put(updateChannelSub.failure(error));
  }
}

function* dmChatSubUpdateByChatPath({ chatPath }) {
  if (chatPath !== 'unreads' || chatPath !== 'threads') {
    yield updateDmChatSubBySlug(chatPath);
  }
}

function* dmChatSubUpdateByMessage({ message }) {
  yield updateDmChatSubBySlug(message.channelSlug);
}

function* watchChannelSubCreateRequest() {
  yield takeLatest(CHANNEL_SUB.CREATE.REQUEST, channelSubCreate);
}

function* watchChannelSubUpdateRequest() {
  yield takeLatest(CHANNEL_SUB.UPDATE.REQUEST, channelSubUpdate);
}

function* watchChannelSubDestroyRequest() {
  yield takeLatest(CHANNEL_SUB.DESTROY.REQUEST, fetchDestroy);
}

function* watchMessageIndexReceive() {
  yield takeLatest(CHAT_PATH_UPDATE, dmChatSubUpdateByChatPath);
}

function* watchMessageCreateReceive() {
  yield takeLatest(MESSAGE.CREATE.RECEIVE, dmChatSubUpdateByMessage);
}

export default function* channelSubSaga() {
  yield all([
    fork(watchChannelSubCreateRequest),
    fork(watchChannelSubUpdateRequest),
    fork(watchChannelSubDestroyRequest),
    fork(watchMessageIndexReceive),
    fork(watchMessageCreateReceive),
  ]);
}
