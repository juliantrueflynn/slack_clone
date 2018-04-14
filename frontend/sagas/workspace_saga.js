import {
  take, all, call, fork, put, takeEvery, select, takeLatest
} from 'redux-saga/effects';
import * as actions from '../actions/workspace_actions';
import * as subActions from '../actions/workspace_sub_actions';
import * as utilApi from '../util/workspace_api_util';
import { createWorkspaceSub } from '../util/workspace_sub_api_util';
import { getWorkspaces, getWorkspacePageId } from '../reducers/selectors';

function* addNewWorkspace({ workspace }) {
  try {
    const newWorkspace = yield call(utilApi.createWorkspace, workspace);
    yield put(actions.createWorkspaceSuccess(newWorkspace));
  } catch (error) {
    yield put(actions.receiveWorkspaceErrors(error));
  }
}

function* subCreatorToNewWorkspace(action) {
  try {
    const { id, ownerId } = action.workspace;
    const workspaceSub = { user_id: ownerId, workspace_id: id };
    const newSub = yield call(createWorkspaceSub, workspaceSub);

    yield put(subActions.createWorkspaceSubSuccess(newSub));
    action.channels = [];
    yield put(actions.receiveWorkspace(action));
  } catch (error) {
    yield put(subActions.createWorkspaceSubErrors(error));
  }
}

function* loadWorkspaces(workspaces) {
  const prevState = yield select(getWorkspaces);
  if (!prevState.length || Object.keys(workspaces).length !== prevState) {
    yield call(fetchWorkspaces, workspaces);
  }
}

function* fetchWorkspaces(prevState) {
  try {
    const workspaces = yield call(utilApi.fetchWorkspaces);
    if (Object.keys(workspaces).length !== Object.keys(prevState).length) {
      yield put(actions.receiveWorkspaces(workspaces));
    }
  } catch (error) {
    yield put(actions.failureWorkspaces(error));
  }
}

function* fetchWorkspace() {
  try {
    const stateWorkspaceId = yield select(getWorkspacePageId);
    const workspace = yield call(utilApi.fetchWorkspace, stateWorkspaceId);
    yield put(actions.receiveWorkspace(workspace));
  } catch (error) {
    yield put(actions.failureWorkspace(error));
  }
}

function* fetchDeleteWorkspace({ workspaceId }) {
  try {
    yield call(utilApi.deleteWorkspace, workspaceId);
    yield put(actions.deleteWorkspaceSuccess(workspaceId));
  } catch (error) {
    yield put(actions.receiveWorkspaceErrors(error));
  }
}

function* watchCreateWorkspace() {
  yield takeEvery(actions.CREATE_WORKSPACE, addNewWorkspace);
  yield takeEvery(actions.CREATE_WORKSPACE_SUCCESS, subCreatorToNewWorkspace);
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