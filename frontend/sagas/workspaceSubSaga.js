import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/workspaceSubActions';
import { DELETE_WORKSPACE_SUB, CREATE_WORKSPACE_SUB } from '../actions/actionTypes';
import * as api from '../util/workspaceSubAPIUtil';

function* loadCreateSub({ workspaceId }) {
  try {
    yield call(api.createWorkspaceSub, { workspaceId });
  } catch (error) {
    yield put(actions.createWorkspaceSubFailure(error));
  }
}

function* loadDeleteSub({ workspaceSlug }) {
  try {
    yield call(api.deleteWorkspaceSub, workspaceSlug);
  } catch (error) {
    yield put(actions.deleteWorkspaceSubFailure(error));
  }
}

function* watchCreateWorkspaceSub() {
  yield takeLatest(CREATE_WORKSPACE_SUB.REQUEST, loadCreateSub);
}

function* watchDeleteSubWorkspace() {
  yield takeLatest(DELETE_WORKSPACE_SUB.REQUEST, loadDeleteSub);
}

export function* workspaceSubSaga() {
  yield all([
    fork(watchCreateWorkspaceSub),
    // fork(watchDeleteSubWorkspace),
  ]);
}
