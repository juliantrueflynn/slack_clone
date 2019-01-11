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

function* workspaceIndex() {
  try {
    const workspaces = yield call(apiFetch, 'workspaces');
    yield put(actions.fetchWorkspaces.receive(workspaces));
  } catch (error) {
    yield put(actions.fetchWorkspaces.failure(error));
  }
}

function* workspaceShow({ workspaceSlug }) {
  try {
    const workspace = yield call(apiFetch, `workspaces/${workspaceSlug}`);
    yield put(actions.fetchWorkspace.receive(workspace));
  } catch (error) {
    yield put(actions.fetchWorkspace.failure(error));
  }
}

function* workspaceCreate({ workspace }) {
  try {
    yield call(apiCreate, 'workspaces', workspace);
  } catch (error) {
    yield put(actions.createWorkspace.failure(error));
  }
}

function* redirectOwner({ workspace: { workspace, owner } }) {
  const currUser = yield select(getCurrentUser);

  if (currUser.id === owner.id) {
    yield put(navigate(`/${workspace.slug}`));
  }
}

function* watchWorkspaceIndexRequest() {
  yield takeLatest(WORKSPACE.INDEX.REQUEST, workspaceIndex);
}

function* watchWorkspaceShowRequest() {
  yield takeLatest(WORKSPACE.SHOW.REQUEST, workspaceShow);
}

function* watchWorkspaceCreateRequest() {
  yield takeLatest(WORKSPACE.CREATE.REQUEST, workspaceCreate);
}

function* watchWorkspaceCreateReceive() {
  yield takeLatest(WORKSPACE.CREATE.RECEIVE, redirectOwner);
}

export default function* workspaceSaga() {
  yield all([
    fork(watchWorkspaceIndexRequest),
    fork(watchWorkspaceShowRequest),
    fork(watchWorkspaceCreateRequest),
    fork(watchWorkspaceCreateReceive),
  ]);
}
