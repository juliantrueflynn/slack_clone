import {
  all,
  call,
  fork,
  put,
  takeLatest,
  select,
} from 'redux-saga/effects';
import * as actions from '../actions/workspaceActions';
import { WORKSPACE } from '../actions/actionTypes';
import { navigate } from '../actions/uiActions';
import { apiFetch, apiCreate } from '../util/apiUtil';
import { getCurrentUser } from '../reducers/selectors';

function* workspaceIndex() {
  try {
    const response = yield call(apiFetch, 'workspaces');
    yield put(actions.fetchWorkspaces.receive(response));
  } catch (error) {
    yield put(actions.fetchWorkspaces.failure(error));
  }
}

function* workspaceShow({ workspaceSlug }) {
  try {
    const response = yield call(apiFetch, `workspaces/${workspaceSlug}`);
    const currentUser = yield select(getCurrentUser);
    const currentUserSlug = currentUser.slug;
    yield put(actions.fetchWorkspace.receive({ ...response, currentUserSlug }));
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
