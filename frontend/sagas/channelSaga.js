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
import { createRead } from '../actions/readActions';

function* fetchIndex({ workspaceSlug }) {
  try {
    const channels = yield call(apiFetch, `workspaces/${workspaceSlug}/channels`);
    yield put(action.fetchChannels.receive(channels));
  } catch (error) {
    yield put(action.fetchChannels.failure(error));
  }
}

function* fetchCreateChannel({ channel }) {
  try {
    let apiUrl = 'channels';
    let channelProps = channel;

    if (channel.hasDm) {
      const { workspaceSlug, ...dmChat } = channel;
      apiUrl = `workspaces/${channel.workspaceSlug}/dm_chat`;
      channelProps = { dmChat };
    }

    const response = yield call(apiCreate, apiUrl, channelProps);
    yield put(createRead.request({ readableId: response.id, readableType: 'Channel' }));
  } catch (error) {
    yield put(action.createChannel.failure(error));
  }
}

function* loadNavigateCreated({ channel: { channel, subs } }) {
  const {
    slug,
    workspaceSlug,
    ownerSlug,
    hasDm,
  } = channel;
  const currUser = yield select(getCurrentUser);
  let isOwner = ownerSlug === currUser.slug;

  if (hasDm) {
    const subsSorted = subs.sort((a, b) => a.id - b.id);
    const { userSlug } = subsSorted[0] || {};
    isOwner = userSlug === currUser.slug;
  }

  if (isOwner) {
    if (!hasDm) {
      yield put(updateModal(null));
    }

    yield put(navigate(`/${workspaceSlug}/messages/${slug}`));
  }
}

function* fetchUpdate({ channel }) {
  try {
    yield call(apiUpdate, `channels/${channel.slug}`, channel);

    yield put(updateFormSuccess('channel', 'Channel successfully updated'));
  } catch (error) {
    yield put(action.updateChannel.failure(error));
  }
}

function* fetchShow({ channelSlug }) {
  try {
    const channel = yield call(apiFetch, `channels/${channelSlug}`);
    yield put(action.fetchChannel.receive(channel));
  } catch (error) {
    yield put(action.fetchChannel.failure(error));
  }
}

function* watchIndex() {
  yield takeLatest(CHANNEL.INDEX.REQUEST, fetchIndex);
}

function* watchCreate() {
  yield takeLatest(CHANNEL.CREATE.REQUEST, fetchCreateChannel);
}

function* watchCreatedReceive() {
  yield takeLatest(CHANNEL.CREATE.RECEIVE, loadNavigateCreated);
}

function* watchUpdate() {
  yield takeLatest(CHANNEL.UPDATE.REQUEST, fetchUpdate);
}

function* watchFetch() {
  yield takeLatest(CHANNEL.SHOW.REQUEST, fetchShow);
}

export default function* channelSaga() {
  yield all([
    fork(watchIndex),
    fork(watchCreate),
    fork(watchCreatedReceive),
    fork(watchUpdate),
    fork(watchFetch),
  ]);
}
