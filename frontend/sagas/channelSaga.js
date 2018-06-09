import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/channelActions';
import { CREATE_CHANNEL, UPDATE_CHANNEL, CHANNEL, DELETE_CHANNEL } from '../actions/actionTypes';
import { apiFetch, apiCreate, apiUpdate, apiDelete } from '../util/apiUtil';
import {
  getPageChannelSlug,
  getChannels,
  getPageWorkspaceSlug,
  getMessageSlug,
  getCurrentUserId,
  getRightSidebarType,
} from '../reducers/selectors';
import { fetchWorkspace } from './workspaceSaga';
import { navigate } from '../actions/navigateActions';
import { modalClose } from '../actions/modalActions';

function* addNewChannel({ channel }) {
  try {
    yield call(apiCreate, 'channels', channel);
    yield put(modalClose('NEW_CHANNEL_MODAL'));
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
    yield call(apiUpdate, `channels/${channel.slug}`, channel);
  } catch (error) {
    yield put(actions.updateChannelFailure(error));
  }
}

function* fetchChannel() {
  try {
    const channelSlug = yield select(getPageChannelSlug);
    const workspaceSlug = yield select(getPageWorkspaceSlug);
    const rightSidebarType = yield select(getRightSidebarType);
    const userId = yield select(getCurrentUserId);
    const ui = { workspaceSlug, channelSlug, userId };
    const channel = yield call(apiFetch, `channels/${channelSlug}`);
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
    yield call(apiDelete, 'channels', channelSlug);
    yield put(actions.deleteChannelReceive(channelSlug));
  } catch (error) {
    yield put(actions.deleteChannelFailure(error));
  }
}

function* watchCreateChannel() {
  yield takeLatest(CHANNEL.CREATE.REQUEST, addNewChannel);
  yield takeLatest(CHANNEL.CREATE.RECEIVE, redirectChannelOwner);
}

function* watchEditChannel() {
  yield takeLatest(CHANNEL.UPDATE.REQUEST, fetchEditChannel);
}

function* watchChannelPage() {
  yield takeLatest(CHANNEL.SHOW.REQUEST, loadChannelEntities);
}

function* watchDeleteChannel() {
  yield takeLatest(CHANNEL.DELETE.REQUEST, fetchDeleteChannel);
}

export default function* channelSaga() {
  yield all([
    fork(watchCreateChannel),
    fork(watchEditChannel),
    fork(watchChannelPage),
    fork(watchDeleteChannel),
  ]);
}
