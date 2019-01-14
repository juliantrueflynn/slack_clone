import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest
} from 'redux-saga/effects';
import * as action from '../actions/chatroomActions';
import { CHATROOM } from '../actions/actionTypes';
import { apiFetch, apiCreate, apiUpdate } from '../util/apiUtil';
import { navigate, updateFormSuccess, updateModal } from '../actions/uiActions';
import { updateRead } from '../actions/readActions';
import { getDrawerPath } from '../reducers/selectors';

function* chatroomIndex({ workspaceSlug }) {
  try {
    const response = yield call(apiFetch, `workspaces/${workspaceSlug}/chatrooms`);
    yield put(action.fetchChatrooms.receive(response));
  } catch (error) {
    yield put(action.fetchChatrooms.failure(error));
  }
}

function* chatroomShow({ chatroomSlug }) {
  try {
    const response = yield call(apiFetch, `chatrooms/${chatroomSlug}`);
    yield put(action.fetchChatroom.receive(response));
  } catch (error) {
    yield put(action.fetchChatroom.failure(error));
  }
}

function* redirectOwner({ hasDm, workspaceSlug, slug }) {
  if (!hasDm) {
    yield put(updateModal(null));
  }

  const drawerUrl = yield select(getDrawerPath);
  let redirectUrl = `/${workspaceSlug}/messages/${slug}`;

  if (drawerUrl) {
    redirectUrl += drawerUrl;
  }

  yield put(navigate(redirectUrl));
}

function* dmChatCreate({ workspaceSlug, ...dmChat }) {
  const response = yield call(apiCreate, `workspaces/${workspaceSlug}/dm_chat`, dmChat);

  return response;
}

function* chatroomCreate({ chatroom }) {
  try {
    let response;

    if (chatroom.hasDm) {
      response = yield call(dmChatCreate, chatroom);
    } else {
      response = yield call(apiCreate, 'chatrooms', chatroom);
    }

    yield put(updateRead.request({ readableId: response.chatroom.id, readableType: 'Chatroom' }));
    yield call(redirectOwner, response.chatroom);
  } catch (error) {
    yield put(action.createChatroom.failure(error));
  }
}

function* chatroomUpdate({ chatroom }) {
  try {
    yield call(apiUpdate, `chatrooms/${chatroom.slug}`, chatroom);
    yield put(updateFormSuccess('Channel successfully updated'));
  } catch (error) {
    yield put(action.updateChatroom.failure(error));
  }
}

function* watchChannelIndexRequest() {
  yield takeLatest(CHATROOM.INDEX.REQUEST, chatroomIndex);
}

function* watchChannelShowRequest() {
  yield takeLatest(CHATROOM.SHOW.REQUEST, chatroomShow);
}

function* watchChannelCreateRequest() {
  yield takeLatest(CHATROOM.CREATE.REQUEST, chatroomCreate);
}

function* watchChannelUpdateRequest() {
  yield takeLatest(CHATROOM.UPDATE.REQUEST, chatroomUpdate);
}

export default function* chatroomSaga() {
  yield all([
    fork(watchChannelIndexRequest),
    fork(watchChannelShowRequest),
    fork(watchChannelCreateRequest),
    fork(watchChannelUpdateRequest),
  ]);
}
