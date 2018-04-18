import {
  take, all, call, fork, put, takeEvery, select, takeLatest
} from 'redux-saga/effects';
import * as actions from '../actions/channel_actions';
import * as utilApi from '../util/channel_api_util';
import { createChannelSubSuccess } from '../actions/channel_sub_actions';
import { createChannelSub } from '../util/channel_sub_api_util';
import {
  getChannelPageId, getChannels, getWorkspacePageId
} from '../reducers/selectors';
import { fetchWorkspace } from './workspace_saga';
import { navigate } from '../actions/navigate_actions';

function* fetchCreatorSub({ userId, channelId }) {
  yield call(createChannelSub, { channelSub: { userId, channelId } });
}

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
    const newChannelSub = yield call(fetchCreatorSub, action);
    yield put(createChannelSubSuccess(newChannelSub));
    yield put(navigate(`/${action.channel.workspaceId}/${action.channel.id}`));
  } catch (error) {
    yield put(actions.createChannelErrors(error));
  }
}

function* addNewChannels({ channels }) {
  for (let channel of channels) {
    const newChannel = yield call(utilApi.createChannel, channel);
    yield call(fetchCreatorSub, {
      userId: newChannel.ownerId,
      channelId: newChannel.id
    });
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

function* loadChannelEntities() {
  const workspaceId = yield select(getWorkspacePageId);
  const channels = yield select(getChannels);
  if (channels.length < 1) {
    yield put(actions.requestChannels());
    yield call(fetchWorkspace, workspaceId);
  }
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

function* watchCreateChannels() {
  yield takeEvery(actions.CREATE_CHANNELS, addNewChannels);
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
    fork(watchCreateChannels),
    fork(watchChannelPage),
    fork(watchDeleteChannel),
  ]);
}