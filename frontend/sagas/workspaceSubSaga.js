import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/workspaceActions';
import { WORKSPACE_SUB } from '../actions/actionTypes';
import { apiCreate, apiDelete } from '../util/apiUtil';

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
    fork(watchDeleteSubWorkspace),
  ]);
}
