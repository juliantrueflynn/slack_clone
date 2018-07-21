import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { fetchChannel, updateChannel, deleteChannel, createChannel } from '../actions/channelActions';
import { CHANNEL, DM_CHAT } from '../actions/actionTypes';
import { apiFetch, apiCreate, apiUpdate, apiDelete } from '../util/apiUtil';
import { selectWorkspaceSlug, selectCurrentUserId } from '../reducers/selectors';
import { navigate, modalClose } from '../actions/interactiveActions';

function* fetchCreate({ channel }) {
  try {
    yield call(apiCreate, 'channels', channel);
  } catch (error) {
    yield put(createChannel.failure(error));
  }
}

function* fetchCreateDm({ dmChat, memberIds }) {
  try {
    yield call(apiCreate, 'dm_chat', { dmChat, memberIds });
  } catch (error) {
    yield put(createChannel.failure(error));
  }
}

function* fetchRedirectOwner({ channel }) {
  const currentUserId = yield select(selectCurrentUserId);
  const workspaceSlug = yield select(selectWorkspaceSlug);

  if (currentUserId === channel.ownerId) {
    yield put(modalClose('NEW_CHANNEL_MODAL'));
    yield put(navigate({ path: `/${workspaceSlug}/${channel.slug}` }));
  }
}

function* fetchUpdate({ channel }) {
  try {
    yield call(apiUpdate, `channels/${channel.slug}`, channel);
  } catch (error) {
    yield put(updateChannel.failure(error));
  }
}

function* fetchShow({ channelSlug }) {
  try {
    const channel = yield call(apiFetch, `channels/${channelSlug}`);
    yield put(fetchChannel.receive(channel));
  } catch (error) {
    yield put(fetchChannel.failure(error));
  }
}

function* fetchDestroy({ channelSlug }) {
  try {
    yield call(apiDelete, `channels/${channelSlug}`);
  } catch (error) {
    yield put(deleteChannel.failure(error));
  }
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
    fork(watchCreate),
    fork(watchCreateDm),
    fork(watchUpdate),
    fork(watchFetch),
    fork(watchDestroy),
  ]);
}
