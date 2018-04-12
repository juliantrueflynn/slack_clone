import { call, put, takeEvery, select, takeLatest } from 'redux-saga/effects';
import * as workspaceActions from '../actions/workspace_actions';
import * as workspaceAPI from '../util/workspace_api_util';

function* watchCreateWorkspace(action) {
  try {
    const newWorkspace = yield call(
      workspaceAPI.createWorkspace, action.workspace
    );
    yield put(workspaceActions.createWorkspaceSuccess(newWorkspace));
  } catch (error) {
    yield put(workspaceActions.receiveWorkspaceErrors([error]));
  }
}

export function* workspaceSaga() {
  yield takeLatest(workspaceActions.CREATE_WORKSPACE, watchCreateWorkspace);
}