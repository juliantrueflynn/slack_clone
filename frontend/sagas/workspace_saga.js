import {
  take, all, call, fork, put, takeEvery, select, takeLatest
} from 'redux-saga/effects';
import * as actions from '../actions/workspace_actions';
import * as subActions from '../actions/workspace_sub_actions';
import * as workspaceAPI from '../util/workspace_api_util';
import * as subAPI from '../util/workspace_sub_api_util';
import { getWorkspaces, getWorkspacePageId } from '../reducers/selectors';
import { receiveChannels } from '../actions/channel_actions';

function* addNewWorkspace(action) {
  try {
    const newWorkspace = yield call(
      workspaceAPI.createWorkspace, action.workspace
    );
    yield put(actions.createWorkspaceSuccess(newWorkspace));
  } catch (error) {
    yield put(actions.receiveWorkspaceErrors(error));
  }
}

function* subCreatorToNewWorkspace(action) {
  try {
    const { id, ownerId } = action.workspace;
    const workspaceSub = { user_id: ownerId, workspace_id: id };
    const newWorkspaceSub = yield call(
      subAPI.createWorkspaceSub, workspaceSub
    );

    yield put(subActions.createWorkspaceSubSuccess(newWorkspaceSub));
    action.channels = [];
    yield put(actions.receiveWorkspace(action));
  } catch (errors) {
    yield put(subActions.createWorkspaceSubErrors(errors));
  }
}

function* watchCreateWorkspace() {
  yield takeEvery(actions.CREATE_WORKSPACE, addNewWorkspace);
  yield takeEvery(
    actions.CREATE_WORKSPACE_SUCCESS, subCreatorToNewWorkspace
  );
}

function* watchWorkspaces() {
  while(true) {
    const { workspaces } = yield take(actions.REQUEST_WORKSPACES);

    yield fork(loadWorkspaces, workspaces);
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
    const workspaces = yield call(workspaceAPI.fetchWorkspaces);
    if (Object.keys(workspaces).length !== Object.keys(prevState).length) {
      yield put(actions.receiveWorkspaces(workspaces));
    }
  } catch (error) {
    yield put(actions.failureWorkspaces([error.message]));
  }
}

function* fetchWorkspace(workspaceId) {
  try {
    const workspace = yield call(workspaceAPI.fetchWorkspace, workspaceId);
    yield put(actions.receiveWorkspace(workspace));
    // yield put(receiveChannels(workspace.channels));
  } catch (errors) {
    yield put(actions.failureWorkspace(errors));
  }
}

function* watchWorkspacePage() {
  while(true) {
    const { workspaceId } = yield take(actions.LOAD_WORKSPACE_PAGE);

    yield fork(fetchWorkspace, workspaceId);
  }
}

export function* workspaceSaga() {
  yield all([
    fork(watchCreateWorkspace),
    fork(watchWorkspaces),
    fork(watchWorkspacePage)
  ]);
}