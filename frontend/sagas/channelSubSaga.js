import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/channelSubActions';
import * as api from '../util/channelSubAPIUtil';
import { getPageWorkspaceSlug } from '../reducers/selectors';
import { navigate } from '../actions/navigateActions';

function* loadCreateSub({ channelSlug }) {
  try {
    const workspaceSlug = yield select(getPageWorkspaceSlug);
    const newChannelSub = yield call(
      api.createChannelSub,
      { channelId: channelSlug }
    );
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
  yield takeLatest(actions.CREATE_CHANNEL_SUB_REQUEST, loadCreateSub);
}

function* watchDeleteSubChannel() {
  yield takeLatest(actions.DELETE_CHANNEL_SUB_REQUEST, loadDeleteSub);
}

export function* channelSubSaga() {
  yield all([
    fork(watchCreateChannelSub),
    // fork(watchDeleteSubChannel),
  ]);
}