import {
  take, all, call, fork, put, takeEvery, select, takeLatest
} from 'redux-saga/effects';
import * as actions from '../actions/workspace_actions';
import {
  createWorkspaceSubSuccess, createWorkspaceSubErrors
} from '../actions/workspace_sub_actions';
import { createChannels, CREATE_CHANNELS } from '../actions/channel_actions';
import * as api from '../util/workspace_api_util';
import { createWorkspaceSub } from '../util/workspace_sub_api_util';
import {
  getWorkspaces, getPageWorkspaceSlug, getChannels
} from '../reducers/selectors';
import { addNewChannels } from './channel_saga';
import { navigate } from '../actions/navigate_actions';

function* fetchWorkspaces(prevState) {
  try {
    const workspaces = yield call(api.fetchWorkspaces);
    if (Object.keys(workspaces).length !== Object.keys(prevState).length) {
      yield put(actions.receiveWorkspaces(workspaces));
    }
  } catch (error) {
    yield put(actions.failureWorkspaces(error));
  }
}

export function* fetchWorkspace() {
  try {
    const workspaceSlug = yield select(getPageWorkspaceSlug);
    const workspace = yield call(api.fetchWorkspace, workspaceSlug);
    yield put(actions.receiveWorkspace(workspace));
  } catch (error) {
    yield put(actions.failureWorkspace(error));
  }
}

function* fetchDeleteWorkspace({ workspaceSlug }) {
  try {
    yield call(api.deleteWorkspace, workspaceSlug);
    yield put(actions.deleteWorkspaceSuccess(workspaceSlug));
  } catch (error) {
    yield put(actions.receiveWorkspaceErrors(error));
  }
}

function* addNewWorkspace({ workspace }) {
  try {
    const newWorkspace = yield call(api.createWorkspace, workspace);
    yield put(actions.createWorkspaceSuccess(newWorkspace));
  } catch (error) {
    yield put(actions.receiveWorkspaceErrors(error));
  }
}

function* subCreatorToNewWorkspace({ workspace }) {
  try {
    const sub = { user_id: workspace.ownerId, workspace_id: workspace.id };
    const newSub = yield call(createWorkspaceSub, sub);

    yield put(createWorkspaceSubSuccess(newSub));
  } catch (error) {
    yield put(createWorkspaceSubErrors(error));
  }
}

function* loadDefaultChannels({ workspace: { id, ownerId } }) {
  let defaultChannels = [];
  const defaultChannelTitles = ['#general', '#random'];
  for (let title of defaultChannelTitles) {
    defaultChannels.push({ title, ownerId, workspaceSlug: id });
  }
  yield put(createChannels(defaultChannels));
}

function* loadWorkspaces(workspaces) {
  const prevState = yield select(getWorkspaces);
  if (!prevState.length || Object.keys(workspaces).length !== prevState) {
    yield call(fetchWorkspaces, workspaces);
  }
}

function* loadWorkspace({ workspaceSlug }) {
  yield call(fetchWorkspace, workspaceSlug);
  const firstChannel = yield select(getChannels);
  if (firstChannel.length) {
    yield put(navigate(`/${workspaceSlug}/${firstChannel[0].id}`));
  } else {
    yield put(navigate(`/${workspaceSlug}/create-channel`));
  }
}

function* watchCreateWorkspace() {
  while (true) {
    const workspace = yield take(actions.CREATE_WORKSPACE);
    yield fork(addNewWorkspace, workspace);
  
    const newWorkspace = yield take(actions.CREATE_WORKSPACE_SUCCESS);
    yield call(subCreatorToNewWorkspace, newWorkspace);
    yield call(loadDefaultChannels, newWorkspace);
    yield put(navigate(`/${newWorkspace.workspace.id}`));
  }
}

function* watchWorkspaces() {
  yield takeLatest(actions.REQUEST_WORKSPACES, loadWorkspaces);
}

function* watchWorkspacePage() {
  yield takeLatest(actions.LOAD_WORKSPACE_PAGE, loadWorkspace);
}

function* watchDeleteWorkspace() {
  yield takeLatest(actions.DELETE_WORKSPACE, fetchDeleteWorkspace);
}

export function* workspaceSaga() {
  yield all([
    fork(watchCreateWorkspace),
    fork(watchWorkspaces),
    fork(watchWorkspacePage),
    fork(watchDeleteWorkspace)
  ]);
}