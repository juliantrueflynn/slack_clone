import {
  all,
  call,
  fork,
  put,
  takeLatest
} from 'redux-saga/effects';
import * as action from '../actions/channelActions';
import { CHANNEL } from '../actions/actionTypes';
import { apiFetch, apiCreate, apiUpdate } from '../util/apiUtil';
import { navigate, updateFormSuccess, updateModal } from '../actions/uiActions';
import { updateRead } from '../actions/readActions';

function* channelIndex({ workspaceSlug }) {
  try {
    const response = yield call(apiFetch, `workspaces/${workspaceSlug}/channels`);
    yield put(action.fetchChannels.receive(response));
  } catch (error) {
    yield put(action.fetchChannels.failure(error));
  }
}

function* channelShow({ channelSlug }) {
  try {
    const response = yield call(apiFetch, `channels/${channelSlug}`);
    yield put(action.fetchChannel.receive(response));
  } catch (error) {
    yield put(action.fetchChannel.failure(error));
  }
}

function* redirectOwner({ hasDm, workspaceSlug, slug }) {
  if (!hasDm) {
    yield put(updateModal(null));
  }

  yield put(navigate(`/${workspaceSlug}/messages/${slug}`));
}

function* dmChatCreate({ workspaceSlug, ...dmChat }) {
  const response = yield call(apiCreate, `workspaces/${workspaceSlug}/dm_chat`, dmChat);

  return response;
}

function* channelCreate({ channel }) {
  try {
    let response;

    if (channel.hasDm) {
      response = yield call(dmChatCreate, channel);
    } else {
      response = yield call(apiCreate, 'channels', channel);
    }

    yield put(updateRead.request({ readableId: response.channel.id, readableType: 'Channel' }));
    yield call(redirectOwner, response.channel);
  } catch (error) {
    yield put(action.createChannel.failure(error));
  }
}

function* channelUpdate({ channel }) {
  try {
    yield call(apiUpdate, `channels/${channel.slug}`, channel);
    yield put(updateFormSuccess('Channel successfully updated'));
  } catch (error) {
    yield put(action.updateChannel.failure(error));
  }
}

function* watchChannelIndexRequest() {
  yield takeLatest(CHANNEL.INDEX.REQUEST, channelIndex);
}

function* watchChannelShowRequest() {
  yield takeLatest(CHANNEL.SHOW.REQUEST, channelShow);
}

function* watchChannelCreateRequest() {
  yield takeLatest(CHANNEL.CREATE.REQUEST, channelCreate);
}

function* watchChannelUpdateRequest() {
  yield takeLatest(CHANNEL.UPDATE.REQUEST, channelUpdate);
}

export default function* channelSaga() {
  yield all([
    fork(watchChannelIndexRequest),
    fork(watchChannelShowRequest),
    fork(watchChannelCreateRequest),
    fork(watchChannelUpdateRequest),
  ]);
}
