import {
  take, all, call, fork, put, select, takeLatest
} from 'redux-saga/effects';
import * as actions from '../actions/workspace_actions';
import * as api from '../util/workspace_api_util';
import {
  createWorkspaceSubSuccess,
  createWorkspaceSubErrors
} from '../actions/workspace_sub_actions';
import { requestDefaultChannels } from '../actions/channel_actions';
import { createWorkspaceSub } from '../util/workspace_sub_api_util';
import { getWorkspaces, getChannels } from '../reducers/selectors';
import { navigate } from '../actions/navigate_actions';

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
    yield put(actions.deleteWorkspaceSuccess(workspaceSlug));
  } catch (error) {
    yield put(actions.deleteWorkspaceFailure(error));
  }
}

function* addNewWorkspace({ workspace }) {
  try {
    const newWorkspace = yield call(api.createWorkspace, workspace);
    yield put(actions.createWorkspaceSuccess(newWorkspace));
  } catch (error) {
    yield put(actions.createWorkspaceFailure(error));
  }
}

function* subCreatorToNewWorkspace({ workspace }) {
  try {
    const sub = { workspace_id: workspace.id };
    const newSub = yield call(createWorkspaceSub, sub);

    yield put(createWorkspaceSubSuccess(newSub));
  } catch (error) {
    yield put(createWorkspaceSubErrors(error));
  }
}

function* loadDefaultChannels({ workspace: { id } }) {
  let defaultChannels = [];
  const defaultChannelTitles = ['general', 'random'];
  for (let title of defaultChannelTitles) {
    defaultChannels.push({ title, workspaceId: id });
  }
  yield put(requestDefaultChannels(defaultChannels));
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

function* watchCreateWorkspace() {
  while (true) {
    const workspace = yield take(actions.CREATE_WORKSPACE_REQUEST);
    yield fork(addNewWorkspace, workspace);
  
    const newWorkspace = yield take(actions.CREATE_WORKSPACE_RECEIVE);
    yield call(subCreatorToNewWorkspace, newWorkspace);
    yield call(loadDefaultChannels, newWorkspace);
  }
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
    fork(watchCreateWorkspace),
    fork(watchWorkspaces),
    fork(watchWorkspacePage),
    fork(watchDeleteWorkspace)
  ]);
}