import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import * as actions from '../actions/workspaceActions';
import { WORKSPACE } from '../actions/actionTypes';
import { navigate } from '../actions/uiActions';
import { apiFetch, apiCreate } from '../util/apiUtil';
import { getCurrentUser } from '../reducers/selectors';

function* addNewWorkspace({ workspace }) {
  try {
    yield call(apiCreate, 'workspaces', workspace);
  } catch (error) {
    yield put(actions.createWorkspace.failure(error));
  }
}

function* redirectOwner({ workspace: { workspace, owner } }) {
  const currUser = yield select(getCurrentUser);

  if (currUser.id === owner.id) {
    yield put(navigate(`/${workspace.slug}`, true));
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
  try {
    const workspace = yield call(apiFetch, `workspaces/${workspaceSlug}`);
    yield put(actions.fetchWorkspace.receive(workspace));
  } catch (error) {
    yield put(actions.fetchWorkspace.failure(error));
  }
}

function* newWorkspaceFlow() {
  yield takeLatest(WORKSPACE.CREATE.REQUEST, addNewWorkspace);
}

function* watchNewWorkspace() {
  yield takeLatest(WORKSPACE.CREATE.RECEIVE, redirectOwner);
}

function* watchWorkspaces() {
  yield takeLatest(WORKSPACE.INDEX.REQUEST, loadWorkspaces);
}

function* watchWorkspacePage() {
  yield takeLatest(WORKSPACE.SHOW.REQUEST, loadWorkspace);
}

export default function* workspaceSaga() {
  yield all([
    fork(newWorkspaceFlow),
    fork(watchNewWorkspace),
    fork(watchWorkspaces),
    fork(watchWorkspacePage),
  ]);
}
