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
import * as api from '../util/apiUtil';
import { selectUIByDisplay, selectEntityBySlug } from '../reducers/selectors';
import { navigate, modalClose } from '../actions/uiActions';

function* fetchIndex({ workspaceSlug }) {
  try {
    const channels = yield call(api.apiFetch, `workspaces/${workspaceSlug}/channels`);
    yield put(action.fetchChannels.receive(channels));
  } catch (error) {
    yield put(action.fetchChannels.failure(error));
  }
}

function* redirectToChannel(chat) {
  if (!chat) {
    return;
  }

  const workspaceSlug = yield select(selectUIByDisplay, 'displayWorkspaceSlug');
  yield put(navigate({ path: `/${workspaceSlug}/messages/${chat.slug}` }));
}

function* fetchCreate(channel) {
  yield put(modalClose('CHAT_MODAL'));
  const chat = yield call(api.apiCreate, 'channels', channel);
  return chat;
}

function* fetchCreateDm({ workspaceSlug, ...dmChat }) {
  const workspace = yield select(selectEntityBySlug, 'workspaces', workspaceSlug);
  const workspaceId = workspace.id;
  const chat = yield call(api.apiCreate, 'dm_chat', { workspaceId, ...dmChat });
  return chat;
}

function* fetchCreateChannel({ channel }) {
  try {
    let chat;
    if (channel.hasDm) {
      chat = yield fetchCreateDm(channel);
    } else {
      chat = yield fetchCreate(channel);
    }

    yield redirectToChannel(chat);
  } catch (error) {
    yield put(action.createChannel.failure(error));
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
  yield takeLatest(CHANNEL.CREATE.REQUEST, fetchCreateChannel);
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
    fork(watchUpdate),
    fork(watchFetch),
    fork(watchDestroy),
  ]);
}
