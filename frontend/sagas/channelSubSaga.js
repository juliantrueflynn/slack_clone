import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { deleteChannelSub, createChannelSub, updateChannelSub } from '../actions/channelActions';
import { CHANNEL_SUB } from '../actions/actionTypes';
import { apiCreate, apiDelete, apiUpdate } from '../util/apiUtil';

function* fetchCreate({ channelId }) {
  try {
    yield call(apiCreate, 'channel_subs', { channelId });
  } catch (error) {
    yield put(createChannelSub.failure(error));
  }
}

function* fetchUpdate({ channelSub: { channelId, userId, inSidebar } }) {
  try {
    const apiUrl = `channel/${channelId}/channel_subs/${userId}`;
    const newSub = yield call(apiUpdate, apiUrl, { inSidebar: !inSidebar });
    yield put(updateChannelSub(newSub));
  } catch (error) {
    yield put(createChannelSub.failure(error));
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

function* watchUpdate() {
  yield takeLatest(CHANNEL_SUB.UPDATE.REQUEST, fetchUpdate);
}

function* watchDestroy() {
  yield takeLatest(CHANNEL_SUB.DESTROY.REQUEST, fetchDestroy);
}

export default function* channelSubSaga() {
  yield all([
    fork(watchCreate),
    fork(watchUpdate),
    fork(watchDestroy),
  ]);
}
