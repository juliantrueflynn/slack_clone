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
    yield call(apiCreate, 'workspace_subs', { workspaceId });
  } catch (error) {
    yield put(actions.createWorkspaceSub.failure(error));
  }
}

function* loadUpdateSub({ workspaceSub: { id } }) {
  try {
    yield call(apiUpdate, `workspace_subs/${id}`, { id });
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
