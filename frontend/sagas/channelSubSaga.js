import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { CHANNEL_SUB, MESSAGE } from '../actions/actionTypes';
import * as actions from '../actions/channelActions';
import { apiCreate, apiDelete, apiUpdate } from '../util/apiUtil';
import { selectOtherDmSub, selectCurrentUser, selectEntityBySlug } from '../reducers/selectors';

function* fetchCreate({ channelSub }) {
  try {
    yield call(apiCreate, 'channel_subs', channelSub);
  } catch (error) {
    yield put(actions.createChannelSub.failure(error));
  }
}

function* fetchUpdate({ channelSub }) {
  try {
    const sub = yield call(apiUpdate, `channel_subs/${channelSub.channelId}`, channelSub);
    yield put(actions.updateChannelSub.receive(sub));
  } catch (error) {
    yield put(actions.createChannelSub.failure(error));
  }
}

function* fetchChannelShow({ messages: { channel } }) {
  try {
    if (channel.hasDm) {
      const currUser = yield select(selectCurrentUser);
      const currChat = yield select(selectEntityBySlug, 'channels', channel.slug);
      const chatSubs = currChat.subs.filter(sub => sub.userSlug && sub.userSlug === currUser.slug);
      const [userSub] = chatSubs;

      if (userSub && !userSub.inSidebar) {
        const { channelId } = chatSubs[0];
        const channelSub = { channelId, inSidebar: true };
        yield fetchUpdate({ channelSub });
      }
    }
  } catch (error) {
    yield put(actions.updateChannelSub.failure(error));
  }
}

function* fetchDmChatMessage({ message: { message } }) {
  try {
    const chat = yield select(selectEntityBySlug, 'channels', message.channelSlug);
    const sub = yield select(selectOtherDmSub, chat.subs);

    if (!sub.inSidebar && chat.hasDm) {
      yield call(apiUpdate, `sidebar_channel_subs/${sub.id}`);
    }
  } catch (error) {
    yield put(actions.updateChannelSub.failure(error));
  }
}

function* fetchDestroy({ channelId }) {
  try {
    yield call(apiDelete, `channel_subs/${channelId}`);
  } catch (error) {
    yield put(actions.deleteChannelSub.failure(error));
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
