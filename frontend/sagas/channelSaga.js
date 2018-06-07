import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/channelActions';
import * as api from '../util/channelAPIUtil';
import { createChannelSubRequest } from '../actions/channelSubActions';
import { createChannelSub } from '../util/channelSubAPIUtil';
import {
  getPageChannelSlug,
  getChannels,
  getPageWorkspaceSlug,
  getMessageSlug,
  getCurrentUserId,
  getRightSidebarType
} from '../reducers/selectors';
import { fetchWorkspace } from './workspaceSaga';
import { navigate } from '../actions/navigateActions';
import { modalClose, NEW_CHANNEL_MODAL } from '../actions/modalActions';

function* addNewChannel({ channel }) {
  try {
    yield call(api.createChannel, channel);
    yield put(modalClose(NEW_CHANNEL_MODAL));
  } catch (error) {
    yield put(actions.createChannelFailure(error));
  }
}

function* redirectChannelOwner({ channel }) {
  const currentUserId = yield select(getCurrentUserId);
  const workspaceSlug = yield select(getPageWorkspaceSlug);

  if (currentUserId === channel.ownerId) {
    yield put(navigate({ path: `/${workspaceSlug}/${channel.slug}` }));
  }
}

function* fetchEditChannel({ channel }) {
  try {
    const newChannel = yield call(api.editChannel, channel);
  } catch (error) {
    yield put(actions.updateChannelFailure(error));
  }
}

function* loadFirstDefaultChannel({ channels, ownerId }) {
  const currentUserId = yield select(getCurrentUserId);
  
  if (currentUserId === ownerId) {
    const workspaceSlug = yield select(getPageWorkspaceSlug);
    yield put(navigate({ path: `/${workspaceSlug}/${channels[0].slug}` }));
  }
}

function* fetchChannel() {
  try {
    const channelSlug = yield select(getPageChannelSlug);
    const workspaceSlug = yield select(getPageWorkspaceSlug);
    const rightSidebarType = yield select(getRightSidebarType);
    const userId = yield select(getCurrentUserId);
    const ui = { workspaceSlug, channelSlug, userId };
    const channel = yield call(api.fetchChannel, channelSlug);
    const messageSlug = yield select(getMessageSlug);
    yield put(actions.channelReceive(channel, ui));
    
    if (rightSidebarType === 'Thread') {
      const baseUrl = `/${workspaceSlug}/${channelSlug}`;
      yield put(navigate({ path: `${baseUrl}/thread/${messageSlug}` }));
    }

    if (rightSidebarType === 'Favorites') {
      const baseUrl = `/${workspaceSlug}/${channelSlug}`;
      yield put(navigate({ path: `${baseUrl}/favorites` }));
    }
  } catch (error) {
    yield put(actions.channelFailure(error));
  }
}

function* loadChannelEntities() {
  const workspaceSlug = yield select(getPageWorkspaceSlug);
  const channels = yield select(getChannels);
  if (channels.length < 1) {
    yield put(actions.channelsRequest());
    yield call(fetchWorkspace, workspaceSlug);
  }
  yield call(fetchChannel);
}

function* fetchDeleteChannel({ channelSlug }) {
  try {
    yield call(api.deleteChannel, channelSlug);
    yield put(actions.deleteChannelReceive(channelSlug));
  } catch (error) {
    yield put(actions.deleteChannelFailure(error));
  }
}

function* watchCreateChannel() {
  yield takeLatest(actions.CREATE_CHANNEL_REQUEST, addNewChannel);
  yield takeLatest(actions.CREATE_CHANNEL_RECEIVE, redirectChannelOwner);
}

function* watchEditChannel() {
  yield takeLatest(actions.UPDATE_CHANNEL_REQUEST, fetchEditChannel);
}

function* watchChannelPage() {
  yield takeLatest(actions.CHANNEL_REQUEST, loadChannelEntities);
}

function* watchDeleteChannel() {
  yield takeLatest(actions.DELETE_CHANNEL_REQUEST, fetchDeleteChannel);
}

export function* channelSaga() {
  yield all([
    fork(watchCreateChannel),
    fork(watchEditChannel),
    fork(watchChannelPage),
    fork(watchDeleteChannel),
  ]);
}