import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/channelActions';
import { CHANNEL_SUB } from '../actions/actionTypes';
import { apiCreate, apiDelete } from '../util/apiUtil';

function* loadCreateSub({ channelSlug }) {
  try {
    yield call(apiCreate, 'channels', { channelId: channelSlug });
  } catch (error) {
    yield put(actions.createChannelSub.failure(error));
  }
}

function* loadDeleteSub({ channelSlug }) {
  try {
    yield call(apiDelete, `channel_subs/${channelSlug}`);
  } catch (error) {
    yield put(actions.deleteChannelSub.failure(error));
  }
}

function* watchCreateChannelSub() {
  yield takeLatest(CHANNEL_SUB.CREATE.REQUEST, loadCreateSub);
}

function* watchDeleteSubChannel() {
  yield takeLatest(CHANNEL_SUB.DELETE.REQUEST, loadDeleteSub);
}

export default function* channelSubSaga() {
  yield all([
    fork(watchCreateChannelSub),
    fork(watchDeleteSubChannel),
  ]);
}
