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
import { apiFetch, apiCreate, apiDelete } from '../util/apiUtil';
import { selectCurrentUser } from '../reducers/selectors';
import { navigate } from '../actions/uiActions';

function* fetchDeleteWorkspace({ workspaceSlug }) {
  try {
    yield call(apiDelete, `workspaces/${workspaceSlug}`);
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

function* redirectOwner({ workspace: { workspace, owner } }) {
  const currUser = yield select(selectCurrentUser);

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

function* watchDeleteWorkspace() {
  yield takeLatest(WORKSPACE.DESTROY.REQUEST, fetchDeleteWorkspace);
}

export default function* workspaceSaga() {
  yield all([
    fork(newWorkspaceFlow),
    fork(watchNewWorkspace),
    fork(watchWorkspaces),
    fork(watchWorkspacePage),
    fork(watchDeleteWorkspace),
  ]);
}
