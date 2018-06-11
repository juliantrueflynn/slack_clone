import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/workspaceSubActions';
import { apiCreate, apiDelete } from '../util/apiUtil';
import { WORKSPACE_SUB } from '../actions/actionTypes';

function* loadCreateSub({ workspaceId }) {
  try {
    yield call(apiCreate, 'workspace_subs', { workspaceId });
  } catch (error) {
    yield put(actions.createWorkspaceSub.failure(error));
  }
}

function* loadDeleteSub({ workspaceSlug }) {
  try {
    yield call(apiDelete, `workspace_subs/${workspaceSlug}`);
  } catch (error) {
    yield put(actions.deleteWorkspaceSub.failure(error));
  }
}

function* watchCreateWorkspaceSub() {
  yield takeLatest(WORKSPACE_SUB.CREATE.REQUEST, loadCreateSub);
}

function* watchDeleteSubWorkspace() {
  yield takeLatest(WORKSPACE_SUB.DELETE.REQUEST, loadDeleteSub);
}

export default function* workspaceSubSaga() {
  yield all([
    fork(watchCreateWorkspaceSub),
    // fork(watchDeleteSubWorkspace),
  ]);
}
