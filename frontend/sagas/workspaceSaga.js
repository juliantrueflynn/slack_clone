import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/workspaceActions';
import * as api from '../util/workspaceAPIUtil';
import { createWorkspaceSubRequest } from '../actions/workspaceSubActions';
import { defaultChannelsRequest } from '../actions/channelActions';
import { createWorkspaceSub } from '../util/workspaceSubAPIUtil';
import {
  getWorkspaces,
  getChannels,
  getCurrentUserId
} from '../reducers/selectors';
import { navigate } from '../actions/navigateActions';

export function* fetchWorkspace(workspaceSlug) {
  try {
    const workspace = yield call(api.fetchWorkspace, workspaceSlug);
    yield put(actions.workspaceReceive(workspace));
  } catch (error) {
    yield put(actions.workspaceFailure(error));
  }
}

function* fetchDeleteWorkspace({ workspaceSlug }) {
  try {
    yield call(api.deleteWorkspace, workspaceSlug);
    yield put(actions.deleteWorkspaceReceive(workspaceSlug));
  } catch (error) {
    yield put(actions.deleteWorkspaceFailure(error));
  }
}

function* addNewWorkspace({ workspace }) {
  try {
    yield call(api.createWorkspace, workspace);
  } catch (error) {
    yield put(actions.createWorkspaceFailure(error));
  }
}

function* receiveNewWorkspace({ workspace }) {
  try {
    const currentUser = yield select(getCurrentUserId);
    yield put(createWorkspaceSubRequest(workspace.id));
  
    let defaultChannels = [];
    const defaultChannelTitles = ['general', 'random'];
    
    for (let title of defaultChannelTitles) {
      defaultChannels.push({ title, workspaceId: workspace.slug });
    }
  
    yield put(defaultChannelsRequest(defaultChannels));
  } catch (error) {
    yield put(actions.workspaceFailure(error));
  }
}

function* loadWorkspaces() {
  try {
    const workspaces = yield call(api.fetchWorkspaces);
    yield put(actions.workspacesReceive(workspaces));
  } catch (error) {
    yield put(actions.workspacesFailure(error));
  }
}

function* loadWorkspace({ workspaceSlug }) {
  yield call(fetchWorkspace, workspaceSlug);
  const channels = yield select(getChannels);
  if (channels.length) {
    yield put(navigate(`/${workspaceSlug}/${channels[0].slug}`));
  } else {
    yield put(navigate(`/${workspaceSlug}/create-channel`));
  }
}

function* newWorkspaceFlow() {
  yield takeLatest(actions.CREATE_WORKSPACE_REQUEST, addNewWorkspace);
  yield takeLatest(actions.CREATE_WORKSPACE_RECEIVE, receiveNewWorkspace);
}

function* watchWorkspaces() {
  yield takeLatest(actions.WORKSPACES_REQUEST, loadWorkspaces);
}

function* watchWorkspacePage() {
  yield takeLatest(actions.WORKSPACE_REQUEST, loadWorkspace);
}

function* watchDeleteWorkspace() {
  yield takeLatest(actions.DELETE_WORKSPACE_REQUEST, fetchDeleteWorkspace);
}

export function* workspaceSaga() {
  yield all([
    fork(newWorkspaceFlow),
    fork(watchWorkspaces),
    fork(watchWorkspacePage),
    fork(watchDeleteWorkspace)
  ]);
}