import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/workspaceSubActions';
import * as api from '../util/workspaceSubAPIUtil';

function* loadCreateSub({ workspaceId }) {
  try {
    const workspaceSub = yield call(api.createWorkspaceSub, { workspaceId });
    // yield put(actions.createWorkspaceSubReceive(workspaceSub));
  } catch (error) {
    yield put(actions.createWorkspaceSubFailure(error));
  }
}

function* loadDeleteSub({ workspaceSlug }) {
  try {
    yield call(api.deleteWorkspaceSub, workspaceSlug);
    // yield put(actions.deleteWorkspaceSubReceive(workspaceSlug));
  } catch (error) {
    yield put(actions.deleteWorkspaceSubFailure(error));
  }
}

function* watchCreateWorkspaceSub() {
  yield takeLatest(actions.CREATE_WORKSPACE_SUB_REQUEST, loadCreateSub);
}

function* watchDeleteSubWorkspace() {
  yield takeLatest(actions.DELETE_WORKSPACE_SUB_REQUEST, loadDeleteSub);
}

export function* workspaceSubSaga() {
  yield all([
    fork(watchCreateWorkspaceSub),
    // fork(watchDeleteSubWorkspace),
  ]);
}