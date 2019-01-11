import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest
} from 'redux-saga/effects';
import * as action from '../actions/channelActions';
import { CHANNEL } from '../actions/actionTypes';
import { apiFetch, apiCreate, apiUpdate } from '../util/apiUtil';
import { navigate, updateFormSuccess, updateModal } from '../actions/uiActions';
import { getCurrentUser } from '../reducers/selectors';
import { updateRead } from '../actions/readActions';
import { fetchMessages } from '../actions/messageActions';

function* channelIndex({ workspaceSlug }) {
  try {
    const response = yield call(apiFetch, `workspaces/${workspaceSlug}/channels`);
    yield put(action.fetchChannels.receive(response));
  } catch (error) {
    yield put(action.fetchChannels.failure(error));
  }
}

function* channelCreate({ channel }) {
  try {
    let apiUrl = 'channels';
    let channelProps = channel;

    if (channel.hasDm) {
      const { workspaceSlug, ...dmChat } = channel;
      apiUrl = `workspaces/${channel.workspaceSlug}/dm_chat`;
      channelProps = { dmChat };
    }

    const response = yield call(apiCreate, apiUrl, channelProps);
    yield put(updateRead.request({ readableId: response.id, readableType: 'Channel' }));
  } catch (error) {
    yield put(action.createChannel.failure(error));
  }
}

function* isCurrentUserOwner({ hasDm, ownerSlug }, channelSubs) {
  const currUser = yield select(getCurrentUser);
  let userSlug = ownerSlug;

  if (hasDm) {
    const subs = channelSubs.sort((a, b) => a.id - b.id);
    userSlug = subs && subs.length && subs[0].userSlug;
  }

  return userSlug && userSlug === currUser.slug;
}

function* redirectOwner({ channel: { channel, channelSubs } }) {
  const { slug, workspaceSlug, hasDm } = channel;

  if (yield isCurrentUserOwner(channel, channelSubs)) {
    if (!hasDm) {
      yield put(updateModal(null));
    }

    yield put(navigate(`/${workspaceSlug}/messages/${slug}`));
    yield put(fetchMessages.request(slug));
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

function* channelShow({ channelSlug }) {
  try {
    const response = yield call(apiFetch, `channels/${channelSlug}`);
    yield put(action.fetchChannel.receive(response));
  } catch (error) {
    yield put(action.fetchChannel.failure(error));
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

function* watchChannelCreateReceive() {
  yield takeLatest(CHANNEL.CREATE.RECEIVE, redirectOwner);
}

function* watchChannelUpdateRequest() {
  yield takeLatest(CHANNEL.UPDATE.REQUEST, channelUpdate);
}

export default function* channelSaga() {
  yield all([
    fork(watchChannelIndexRequest),
    fork(watchChannelShowRequest),
    fork(watchChannelCreateRequest),
    fork(watchChannelCreateReceive),
    fork(watchChannelUpdateRequest),
  ]);
}
