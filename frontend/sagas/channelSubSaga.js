import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/channelSubActions';
import * as api from '../util/channelSubAPIUtil';
import { getPageWorkspaceSlug } from '../reducers/selectors';
import { navigate } from '../actions/navigateActions';

function* addChannelSub({ channelSlug }) {
  try {
    const workspaceSlug = yield select(getPageWorkspaceSlug);
    const newChannelSub = yield call(api.createChannelSub, { channelSlug });
    yield put(actions.createChannelSubReceive(newChannelSub));
    yield put(navigate(`/${workspaceSlug}/${channelSlug}`));
  } catch (error) {
    yield put(actions.createChannelSubFailure(error));
  }
}

// function* fetchDeleteChannelSub({ channelSlug }) {
//   try {
//     yield call(api.deleteChannel, channelSlug);
//     yield put(actions.deleteChannelReceive(channelSlug));
//   } catch (error) {
//     yield put(actions.deleteChannelFailure(error));
//   }
// }

function* watchCreateChannelSub() {
  yield takeLatest(actions.CREATE_CHANNEL_SUB_REQUEST, addChannelSub);
}

// function* watchDeleteSubChannel() {
//   yield takeLatest(actions.DELETE_CHANNEL_SUB_REQUEST, fetchDeleteChannelSub);
// }

export function* channelSubSaga() {
  yield all([
    fork(watchCreateChannelSub),
    // fork(watchDeleteSubChannel),
  ]);
}