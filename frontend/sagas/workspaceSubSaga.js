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

function* loadCreateSub({ workspaceSub: { workspaceId } }) {
  try {
    const response = yield call(apiCreate, 'workspace_sub', { workspaceId });
    yield put(actions.createWorkspaceSub.receive(response, true));
  } catch (error) {
    yield put(actions.createWorkspaceSub.failure(error));
  }
}

function* loadUpdateSub({ workspaceSub: { workspaceId } }) {
  try {
    const response = yield call(apiUpdate, 'workspace_sub', { workspaceId });
    yield put(actions.updateWorkspaceSub.receive(response, true));
  } catch (error) {
    yield put(actions.updateWorkspaceSub.failure(error));
  }
}

function* watchCreateWorkspaceSub() {
  yield takeLatest(WORKSPACE_SUB.CREATE.REQUEST, loadCreateSub);
}

function* watchUpdateSubWorkspace() {
  yield takeLatest(WORKSPACE_SUB.UPDATE.REQUEST, loadUpdateSub);
}

export default function* workspaceSubSaga() {
  yield all([
    fork(watchCreateWorkspaceSub),
    fork(watchUpdateSubWorkspace),
  ]);
}
