import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { CHANNEL_SUB, MESSAGE } from '../actions/actionTypes';
import { deleteChannelSub, createChannelSub, updateChannelSub } from '../actions/channelActions';
import { apiCreate, apiDelete, apiUpdate } from '../util/apiUtil';
import { selectChatBySlug, selectOtherDmSub, selectCurrentUserSlug } from '../reducers/selectors';

function* fetchCreate({ channelSub }) {
  try {
    yield call(apiCreate, 'channel_subs', channelSub);
  } catch (error) {
    yield put(createChannelSub.failure(error));
  }
}

function* fetchUpdate({ channelSub }) {
  try {
    const sub = yield call(apiUpdate, `channel_subs/${channelSub.channelId}`, channelSub);
    yield put(updateChannelSub.receive(sub));
  } catch (error) {
    yield put(createChannelSub.failure(error));
  }
}

function* fetchChannelShow({ messages: { channel, subs } }) {
  try {
    const currUserSlug = yield select(selectCurrentUserSlug);
    const chatSubs = subs.filter(sub => sub.userSlug && sub.userSlug === currUserSlug);

    if (chatSubs[0] && !chatSubs[0].inSidebar && channel.hasDm) {
      const { channelId } = chatSubs[0];
      const channelSub = { channelId, inSidebar: true };
      yield fetchUpdate({ channelSub });
    }
  } catch (error) {
    yield put(createChannelSub.failure(error));
  }
}

function* fetchDmChatMessage({ message }) {
  try {
    const chat = yield select(selectChatBySlug, message.channelSlug);
    const sub = yield select(selectOtherDmSub, chat.subs);

    if (!sub.inSidebar && chat.hasDm) {
      yield call(apiUpdate, `sidebar_channel_subs/${sub.id}`);
    }
  } catch (error) {
    yield put(updateChannelSub.failure(error));
  }
}

function* fetchDestroy({ channelId }) {
  try {
    yield call(apiDelete, `channel_subs/${channelId}`);
  } catch (error) {
    yield put(deleteChannelSub.failure(error));
  }
}

function* watchCreate() {
  yield takeLatest(CHANNEL_SUB.CREATE.REQUEST, fetchCreate);
}

function* watchChannelShow() {
  yield takeLatest(MESSAGE.INDEX.RECEIVE, fetchChannelShow);
}

function* watchDmChatMessage() {
  yield takeLatest(MESSAGE.CREATE.RECEIVE, fetchDmChatMessage);
}

function* watchUpdate() {
  yield takeLatest(CHANNEL_SUB.UPDATE.REQUEST, fetchUpdate);
}

function* watchDestroy() {
  yield takeLatest(CHANNEL_SUB.DESTROY.REQUEST, fetchDestroy);
}

export default function* channelSubSaga() {
  yield all([
    fork(watchCreate),
    fork(watchChannelShow),
    fork(watchDmChatMessage),
    fork(watchUpdate),
    fork(watchDestroy),
  ]);
}
