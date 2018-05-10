import {
  take, all, call, fork, put, takeEvery, select, takeLatest
} from 'redux-saga/effects';
import * as actions from '../actions/channel_actions';
import * as utilApi from '../util/channel_api_util';
import { createChannelSubSuccess } from '../actions/channel_sub_actions';
import { createChannelSub } from '../util/channel_sub_api_util';
import {
  getPageChannelSlug, getChannels, getPageWorkspaceSlug, getThreadId
} from '../reducers/selectors';
import { fetchWorkspace } from './workspace_saga';
import { navigate } from '../actions/navigate_actions';

function* fetchCreatorSub(userId, channelSlug) {
  yield call(createChannelSub, { userId, channelSlug });
}

function* addNewChannel({ channel }) {
  try {
    const newChannel = yield call(utilApi.createChannel, channel);
    yield put(actions.createChannelSuccess(newChannel));
  } catch (error) {
    yield put(actions.receiveChannelErrors(error));
  }
}

function* subCreatorToNewChannel({ channel }) {
  try {
    const workspaceSlug = yield select(getPageWorkspaceSlug);
    const newSub = yield call(fetchCreatorSub, channel.ownerId, channel.id);
    yield put(createChannelSubSuccess(newSub));
    yield put(navigate(`/${ workspaceSlug }/${ channel.slug }`));
  } catch (error) {
    yield put(actions.createChannelErrors(error));
  }
}

function* fetchEditChannel({ channel }) {
  try {
    const newChannel = yield call(utilApi.editChannel, channel);
    yield put(actions.editChannelSuccess(newChannel));
  } catch (error) {
    yield put(actions.receiveChannelErrors(error));
  }
}

function* addNewChannels({ channels }) {
  let newChannels = [];
  for (let channel of channels) {
    const newChannel = yield call(utilApi.createChannel, channel);
    yield call(fetchCreatorSub, newChannel.ownerId, newChannel.id);
    newChannels.push(newChannel);
  }
  yield put(actions.createChannelsSuccess(newChannels));
}

function* fetchChannel() {
  try {
    const channelSlug = yield select(getPageChannelSlug);
    const channel = yield call(utilApi.fetchChannel, channelSlug);
    const threadId = yield select(getThreadId);
    yield put(actions.receiveChannel(channel, threadId));
  } catch (error) {
    yield put(actions.failureChannel(error));
  }
}

function* loadChannelEntities() {
  const workspaceSlug = yield select(getPageWorkspaceSlug);
  const channels = yield select(getChannels);
  if (channels.length < 1) {
    yield put(actions.requestChannels());
    yield call(fetchWorkspace, workspaceSlug);
  }
  yield call(fetchChannel);
}

function* fetchDeleteChannel({ channelSlug }) {
  try {
    yield call(utilApi.deleteChannel, channelSlug);
    yield put(actions.deleteChannelSuccess(channelSlug));
  } catch (error) {
    yield put(actions.receiveChannelErrors(error));
  }
}

function* watchCreateChannel() {
  yield takeEvery(actions.CREATE_CHANNEL, addNewChannel);
  yield takeEvery(actions.CREATE_CHANNEL_SUCCESS, subCreatorToNewChannel);
}

function* watchEditChannel() {
  yield takeLatest(actions.EDIT_CHANNEL, fetchEditChannel);
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
    fork(watchEditChannel),
    fork(watchCreateChannels),
    fork(watchChannelPage),
    fork(watchDeleteChannel),
  ]);
}