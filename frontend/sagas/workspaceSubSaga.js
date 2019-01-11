import {
  all,
  call,
  fork,
  put,
  takeLatest
} from 'redux-saga/effects';
import * as actions from '../actions/workspaceActions';
import { WORKSPACE_SUB } from '../actions/actionTypes';
import { apiCreate, apiUpdate } from '../util/apiUtil';

function* workspaceSubCreate({ workspaceSub: { workspaceId } }) {
  try {
    const response = yield call(apiCreate, 'workspace_sub', { workspaceId });
    yield put(actions.createWorkspaceSub.receive(response, true));
  } catch (error) {
    yield put(actions.createWorkspaceSub.failure(error));
  }
}

function* workspaceSubUpdate({ workspaceSub: { workspaceId } }) {
  try {
    const response = yield call(apiUpdate, 'workspace_sub', { workspaceId });
    yield put(actions.updateWorkspaceSub.receive(response, true));
  } catch (error) {
    yield put(actions.updateWorkspaceSub.failure(error));
  }
}

function* watchWorkspaceSubCreateRequest() {
  yield takeLatest(WORKSPACE_SUB.CREATE.REQUEST, workspaceSubCreate);
}

function* watchWorkspaceSubUpdateRequest() {
  yield takeLatest(WORKSPACE_SUB.UPDATE.REQUEST, workspaceSubUpdate);
}

export default function* workspaceSubSaga() {
  yield all([
    fork(watchWorkspaceSubCreateRequest),
    fork(watchWorkspaceSubUpdateRequest),
  ]);
}
