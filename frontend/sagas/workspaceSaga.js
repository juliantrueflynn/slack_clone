import {
  all,
  call,
  fork,
  put,
  takeLatest,
} from 'redux-saga/effects';
import * as actions from '../actions/workspaceActions';
import { WORKSPACE } from '../actions/actionTypes';
import { navigate } from '../actions/uiActions';
import { apiFetch, apiCreate } from '../util/apiUtil';

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
    const response = yield call(apiCreate, 'workspaces', workspace);
    yield put(navigate(`/${response.slug}`));
  } catch (error) {
    yield put(actions.createWorkspace.failure(error));
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

export default function* workspaceSaga() {
  yield all([
    fork(watchWorkspaceIndexRequest),
    fork(watchWorkspaceShowRequest),
    fork(watchWorkspaceCreateRequest),
  ]);
}
