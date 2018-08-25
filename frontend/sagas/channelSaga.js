import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest
} from 'redux-saga/effects';
import * as action from '../actions/channelActions';
import { CHANNEL, DM_CHAT } from '../actions/actionTypes';
import * as api from '../util/apiUtil';
import { selectWorkspaceSlug, selectCurrentUserId } from '../reducers/selectors';
import { navigate, modalClose } from '../actions/interactiveActions';

function* fetchIndex({ workspaceSlug }) {
  try {
    const channels = yield call(api.apiFetch, `workspaces/${workspaceSlug}/channels`);
    yield put(action.fetchChannels.receive(channels));
  } catch (error) {
    yield put(action.createChannel.failure(error));
  }
}

function* fetchCreate({ channel }) {
  try {
    yield call(api.apiCreate, 'channels', channel);
  } catch (error) {
    yield put(action.createChannel.failure(error));
  }
}

function* fetchCreateDm({ dmChat }) {
  try {
    yield call(api.apiCreate, 'dm_chat', dmChat);
  } catch (error) {
    yield put(action.createChannel.failure(error));
  }
}

function* fetchRedirectOwner({ channel }) {
  const currentUserId = yield select(selectCurrentUserId);
  const workspaceSlug = yield select(selectWorkspaceSlug);

  if (currentUserId === channel.ownerId) {
    yield put(modalClose('MODAL_CHAT'));
    yield put(navigate({ path: `/${workspaceSlug}/${channel.slug}` }));
  }
}

function* fetchUpdate({ channel }) {
  try {
    yield call(api.apiUpdate, `channels/${channel.slug}`, channel);
  } catch (error) {
    yield put(action.updateChannel.failure(error));
  }
}

function* fetchShow({ channelSlug }) {
  try {
    const channel = yield call(api.apiFetch, `channels/${channelSlug}`);
    yield put(action.fetchChannel.receive(channel));
  } catch (error) {
    yield put(action.fetchChannel.failure(error));
  }
}

function* fetchDestroy({ channelSlug }) {
  try {
    yield call(api.apiDelete, `channels/${channelSlug}`);
  } catch (error) {
    yield put(action.deleteChannel.failure(error));
  }
}

function* watchIndex() {
  yield takeLatest(CHANNEL.INDEX.REQUEST, fetchIndex);
}

function* watchCreate() {
  yield takeLatest(CHANNEL.CREATE.REQUEST, fetchCreate);
  yield takeLatest(CHANNEL.CREATE.RECEIVE, fetchRedirectOwner);
}

function* watchCreateDm() {
  yield takeLatest(DM_CHAT.CREATE.REQUEST, fetchCreateDm);
}

function* watchUpdate() {
  yield takeLatest(CHANNEL.UPDATE.REQUEST, fetchUpdate);
}

function* watchFetch() {
  yield takeLatest(CHANNEL.SHOW.REQUEST, fetchShow);
}

function* watchDestroy() {
  yield takeLatest(CHANNEL.DESTROY.REQUEST, fetchDestroy);
}

export default function* channelSaga() {
  yield all([
    fork(watchIndex),
    fork(watchCreate),
    fork(watchCreateDm),
    fork(watchUpdate),
    fork(watchFetch),
    fork(watchDestroy),
  ]);
}
