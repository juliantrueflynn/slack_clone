import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/workspaceActions';
import { apiFetch, apiCreate, apiDelete } from '../util/apiUtil';
import { WORKSPACE, WORKSPACES, CREATE_WORKSPACE, DELETE_WORKSPACE } from '../actions/actionTypes';
import { getChannels, getCurrentUserId } from '../reducers/selectors';
import { navigate } from '../actions/navigateActions';

export function* fetchWorkspace(workspaceSlug) {
  try {
    const workspace = yield call(apiFetch, `workspaces/${workspaceSlug}`);
    yield put(actions.workspaceReceive(workspace));
  } catch (error) {
    yield put(actions.workspaceFailure(error));
  }
}

function* redirectOwner({ workspace }) {
  const currentUserId = yield select(getCurrentUserId);

  if (currentUserId === workspace.ownerId) {
    yield put(navigate({ path: `/${workspace.slug}` }));
  }
}

function* fetchDeleteWorkspace({ workspaceSlug }) {
  try {
    yield call(apiDelete, 'workspaces', workspaceSlug);
    yield put(actions.deleteWorkspaceReceive(workspaceSlug));
  } catch (error) {
    yield put(actions.deleteWorkspaceFailure(error));
  }
}

function* addNewWorkspace({ workspace }) {
  try {
    yield call(apiCreate, 'workspaces', workspace);
  } catch (error) {
    yield put(actions.createWorkspaceFailure(error));
  }
}

function* loadWorkspaces() {
  try {
    const workspaces = yield call(apiFetch, 'workspaces');
    yield put(actions.workspacesReceive(workspaces));
  } catch (error) {
    yield put(actions.workspacesFailure(error));
  }
}

function* loadWorkspace({ workspaceSlug }) {
  yield call(fetchWorkspace, workspaceSlug);

  const channels = yield select(getChannels);
  if (channels.length) {
    yield put(navigate({ path: `/${workspaceSlug}/${channels[0].slug}` }));
  } else {
    yield put(navigate({ path: '/' }));
  }
}

function* newWorkspaceFlow() {
  yield takeLatest(CREATE_WORKSPACE.REQUEST, addNewWorkspace);
  yield takeLatest(CREATE_WORKSPACE.RECEIVE, redirectOwner);
}

function* watchWorkspaces() {
  yield takeLatest(WORKSPACES.REQUEST, loadWorkspaces);
}

function* watchWorkspacePage() {
  yield takeLatest(WORKSPACE.REQUEST, loadWorkspace);
}

function* watchDeleteWorkspace() {
  yield takeLatest(DELETE_WORKSPACE.REQUEST, fetchDeleteWorkspace);
}

export default function* workspaceSaga() {
  yield all([
    fork(newWorkspaceFlow),
    fork(watchWorkspaces),
    fork(watchWorkspacePage),
    fork(watchDeleteWorkspace),
  ]);
}
