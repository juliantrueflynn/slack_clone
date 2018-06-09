import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/workspaceSubActions';
import { apiCreate, apiDelete } from '../util/apiUtil';
import { DELETE_WORKSPACE_SUB, CREATE_WORKSPACE_SUB } from '../actions/actionTypes';

function* loadCreateSub({ workspaceId }) {
  try {
    yield call(apiCreate, 'workspace_subs', { workspaceId });
  } catch (error) {
    yield put(actions.createWorkspaceSubFailure(error));
  }
}

function* loadDeleteSub({ workspaceSlug }) {
  try {
    yield call(apiDelete, 'workspace_subs', workspaceSlug);
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

export default function* workspaceSubSaga() {
  yield all([
    fork(watchCreateWorkspaceSub),
    // fork(watchDeleteSubWorkspace),
  ]);
}
