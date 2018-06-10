import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/workspaceActions';
import { WORKSPACE } from '../actions/actionTypes';
import { apiFetch, apiCreate, apiDelete } from '../util/apiUtil';
import { getChannels, getCurrentUserId, getPageWorkspaceSlug } from '../reducers/selectors';
import { navigate } from '../actions/navigateActions';

export function* fetchWorkspace(workspaceSlug) {
  try {
    const workspace = yield call(apiFetch, `workspaces/${workspaceSlug}`);
    yield put(actions.fetchWorkspace.receive(workspace));
  } catch (error) {
    yield put(actions.fetchWorkspace.failure(error));
  }
}

function* redirectOwner({ workspace }) {
  const currentUserId = yield select(getCurrentUserId);
  const currWorkspaceSlug = yield select(getPageWorkspaceSlug);

  if (currentUserId === workspace.ownerId && currWorkspaceSlug !== workspace.slug) {
    yield put(navigate({ path: `/${workspace.slug}` }));
  }
}

function* fetchDeleteWorkspace({ workspaceSlug }) {
  try {
    yield call(apiDelete, 'workspaces', workspaceSlug);
    yield put(actions.deleteWorkspace.receive(workspaceSlug));
  } catch (error) {
    yield put(actions.deleteWorkspace.failure(error));
  }
}

function* addNewWorkspace({ workspace }) {
  try {
    yield call(apiCreate, 'workspaces', workspace);
  } catch (error) {
    yield put(actions.createWorkspace.failure(error));
  }
}

function* loadWorkspaces() {
  try {
    const workspaces = yield call(apiFetch, 'workspaces');
    yield put(actions.fetchWorkspaces.receive(workspaces));
  } catch (error) {
    yield put(actions.fetchWorkspaces.failure(error));
  }
}

function* loadWorkspace({ workspaceSlug }) {
  const workspace = yield call(apiFetch, `workspaces/${workspaceSlug}`);
  yield put(actions.fetchWorkspace.receive(workspace));

  const channels = yield select(getChannels);
  if (channels.length) {
    yield put(navigate({ path: `/${workspaceSlug}/${channels[0].slug}` }));
  } else {
    yield put(navigate({ path: '/' }));
  }
}

function* newWorkspaceFlow() {
  yield takeLatest(WORKSPACE.CREATE.REQUEST, addNewWorkspace);
  yield takeLatest(WORKSPACE.CREATE.RECEIVE, redirectOwner);
}

function* watchWorkspaces() {
  yield takeLatest(WORKSPACE.INDEX.REQUEST, loadWorkspaces);
}

function* watchWorkspacePage() {
  yield takeLatest(WORKSPACE.SHOW.REQUEST, loadWorkspace);
}

function* watchDeleteWorkspace() {
  yield takeLatest(WORKSPACE.DELETE.REQUEST, fetchDeleteWorkspace);
}

export default function* workspaceSaga() {
  yield all([
    fork(newWorkspaceFlow),
    fork(watchWorkspaces),
    fork(watchWorkspacePage),
    fork(watchDeleteWorkspace),
  ]);
}
