import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { CHANNEL_SUB, MESSAGE } from '../actions/actionTypes';
import { createChannelSub, updateChannelSub, destroyChannelSub } from '../actions/channelActions';
import { apiCreate, apiDestroy, apiUpdate } from '../util/apiUtil';
import { selectEntities, getCurrentUser, selectEntityBySlug } from '../reducers/selectors';
import { destroyRead, createRead } from '../actions/readActions';

function* callReadAction(actionCaller, channelSub) {
  if (channelSub) {
    const { channelId: readableId } = channelSub;
    yield put(actionCaller.request({ readableId, readableType: 'Channel' }));
  }
}

function* fetchCreate({ channelSub }) {
  try {
    const response = yield call(apiCreate, 'channel_subs', channelSub);
    yield callReadAction(createRead, response);
  } catch (error) {
    yield put(createChannelSub.failure(error));
  }
}

function* fetchUpdate({ channelSlug }) {
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

function* updateDmSubBySlug(channelSlug) {
  const channel = yield select(selectEntityBySlug, 'channels', channelSlug);

  if (channel.hasDm) {
    const user = yield select(getCurrentUser);
    const subsMap = yield select(selectEntities, 'channelSubs');
    const userSub = channel.subs.map(id => subsMap[id]).filter(sub => sub.userId === user.id)[0];

    if (userSub && !userSub.inSidebar) {
      yield put(updateChannelSub.request(channelSlug));
    }
  }
}

function* fetchChannelShow({ messages: { channel } }) {
  try {
    yield updateDmSubBySlug(channel.slug);
  } catch (error) {
    yield put(updateChannelSub.failure(error));
  }
}

function* fetchDmChatMessage({ message }) {
  try {
    yield updateDmSubBySlug(message.channelSlug);
  } catch (error) {
    yield put(updateChannelSub.failure(error));
  }
}

function* watchCreate() {
  yield takeLatest(CHANNEL_SUB.CREATE.REQUEST, fetchCreate);
}

function* watchUpdate() {
  yield takeLatest(CHANNEL_SUB.UPDATE.REQUEST, fetchUpdate);
}

function* watchDestroy() {
  yield takeLatest(CHANNEL_SUB.DESTROY.REQUEST, fetchDestroy);
}

function* watchChannelShow() {
  yield takeLatest(MESSAGE.INDEX.RECEIVE, fetchChannelShow);
}

function* watchDmChatMessage() {
  yield takeLatest(MESSAGE.CREATE.RECEIVE, fetchDmChatMessage);
}

export default function* channelSubSaga() {
  yield all([
    fork(watchCreate),
    fork(watchUpdate),
    fork(watchDestroy),
    fork(watchChannelShow),
    fork(watchDmChatMessage),
  ]);
}
