import {
  take, all, call, fork, put, takeEvery, select, takeLatest
} from 'redux-saga/effects';
import * as actions from '../actions/workspace_actions';
import {
  createWorkspaceSubSuccess, createWorkspaceSubErrors
} from '../actions/workspace_sub_actions';
import { createChannels } from '../actions/channel_actions';
import * as api from '../util/workspace_api_util';
import { createWorkspaceSub } from '../util/workspace_sub_api_util';
import { getWorkspaces, getWorkspacePageId } from '../reducers/selectors';
import { addNewChannels } from './channel_saga';

function* addNewWorkspace({ workspace }) {
  try {
    const newWorkspace = yield call(api.createWorkspace, workspace);
    yield put(actions.createWorkspaceSuccess(newWorkspace));
  } catch (error) {
    yield put(actions.receiveWorkspaceErrors(error));
  }
}

function* subCreatorToNewWorkspace({ workspace, channels }) {
  try {
    const sub = { user_id: workspace.ownerId, workspace_id: workspace.id };
    const newSub = yield call(createWorkspaceSub, sub);

    yield put(createWorkspaceSubSuccess(newSub));
  } catch (error) {
    yield put(createWorkspaceSubErrors(error));
  }
}

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
    const stateWorkspaceId = yield select(getWorkspacePageId);
    const workspace = yield call(api.fetchWorkspace, stateWorkspaceId);
    yield put(actions.receiveWorkspace(workspace));
  } catch (error) {
    yield put(actions.failureWorkspace(error));
  }
}

function* fetchDeleteWorkspace({ workspaceId }) {
  try {
    yield call(api.deleteWorkspace, workspaceId);
    yield put(actions.deleteWorkspaceSuccess(workspaceId));
  } catch (error) {
    yield put(actions.receiveWorkspaceErrors(error));
  }
}

function* fetchDefaultWorkspaceChannels({ workspace: { id, ownerId } }) {
  // const defaultChannels = [{
  //   title: '#general',
  //   workspaceId: workspace.id,
  //   ownerId: workspace.ownerId
  // },{
  //   title: '#random',
  //   workspaceId: workspace.id,
  //   ownerId: workspace.ownerId
  // }];
  let defaultChannels = [];
  const defaultChannelTitles = ['#general', '#random'];
  defaultChannelTitles.forEach(title => {
    defaultChannels.push({ title, ownerId, workspaceId: id });
  });

  yield put(createChannels(defaultChannels));
}

function* loadWorkspaces(workspaces) {
  const prevState = yield select(getWorkspaces);
  if (!prevState.length || Object.keys(workspaces).length !== prevState) {
    yield call(fetchWorkspaces, workspaces);
  }
}

function* watchCreateWorkspace() {
  yield takeEvery(actions.CREATE_WORKSPACE, addNewWorkspace);
  yield takeEvery(actions.CREATE_WORKSPACE_SUCCESS, fetchDefaultWorkspaceChannels);
}

function* watchWorkspaces() {
  yield takeLatest(actions.REQUEST_WORKSPACES, loadWorkspaces);
}

function* watchWorkspacePage() {
  yield takeLatest(actions.LOAD_WORKSPACE_PAGE, fetchWorkspace);
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