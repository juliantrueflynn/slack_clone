import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/channelSubActions';
import { CREATE_CHANNEL_SUB, DELETE_CHANNEL_SUB } from '../actions/actionTypes';
import * as api from '../util/channelSubAPIUtil';

function* loadCreateSub({ channelSlug }) {
  try {
    yield call(api.createChannelSub, { channelId: channelSlug });
  } catch (error) {
    yield put(actions.createChannelSubFailure(error));
  }
}

function* loadDeleteSub({ channelSlug }) {
  try {
    yield call(api.deleteChannelSub, channelSlug);
  } catch (error) {
    yield put(actions.deleteChannelSubFailure(error));
  }
}

function* watchCreateChannelSub() {
  yield takeLatest(CREATE_CHANNEL_SUB.REQUEST, loadCreateSub);
}

function* watchDeleteSubChannel() {
  yield takeLatest(DELETE_CHANNEL_SUB.REQUEST, loadDeleteSub);
}

export function* channelSubSaga() {
  yield all([
    fork(watchCreateChannelSub),
    // fork(watchDeleteSubChannel),
  ]);
}
