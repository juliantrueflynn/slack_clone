import {
  take, all, call, fork, put, takeEvery, select, takeLatest
} from 'redux-saga/effects';
import * as actions from '../actions/channel_actions';
import * as utilApi from '../util/channel_api_util';
import * as subActions from '../actions/channel_sub_actions';
import * as subUtilApi from '../util/channel_sub_api_util';
import {
  getChannelPageId, getChannels, getWorkspacePageId, getWorkspaces
} from '../reducers/selectors';
import { loadWorkspacePage } from '../actions/workspace_actions';

function* addNewChannel({ channel }) {
  try {
    const newChannel = yield call(utilApi.createChannel, channel);
    yield put(actions.createChannelSuccess(newChannel));
  } catch (error) {
    yield put(actions.receiveChannelErrors(error));
  }
}

function* subCreatorToNewChannel(action) {
  try {
    const { id, ownerId } = action.channel;
    const channelSub = { user_id: ownerId, channel_id: id };
    const newChannelSub = yield call(subUtilApi.createChannelSub, channelSub);

    yield put(subActions.createChannelSubSuccess(newChannelSub));
    action.members = [];
    action.messages = [];
    yield put(actions.receiveChannel(action));
  } catch (error) {
    yield put(actions.createChannelErrors(error));
  }
}

function* fetchChannel() {
  try {
    const channelId = yield select(getChannelPageId);
    const channel = yield call(utilApi.fetchChannel, channelId);
    yield put(actions.receiveChannel(channel));
  } catch (error) {
    yield put(actions.failureChannel(error));
  }
}

function* loadChannelEntities({ workspaceId }) {
  const workspaces = yield select(getWorkspaces);
  if (getWorkspaces.length) yield put(loadWorkspacePage(workspaceId));
  yield call(fetchChannel);
}

function* fetchDeleteChannel({ channelId }) {
  try {
    yield call(utilApi.deleteChannel, channelId);
    yield put(actions.deleteChannelSuccess(channelId));
  } catch (error) {
    yield put(actions.receiveChannelErrors(error));
  }
}

function* watchCreateChannel() {
  yield takeEvery(actions.CREATE_CHANNEL, addNewChannel);
  yield takeEvery(actions.CREATE_CHANNEL_SUCCESS, subCreatorToNewChannel);
}

function* watchChannelPage() {
  yield takeLatest(actions.LOAD_CHANNEL_PAGE, loadChannelEntities);
}

function* watchDeleteChannel() {
  yield takeLatest(actions.DELETE_CHANNEL, fetchDeleteChannel);
}

export function* channelSaga() {
  yield all([
    fork(watchCreateChannel),
    fork(watchChannelPage),
    fork(watchDeleteChannel),
  ]);
}