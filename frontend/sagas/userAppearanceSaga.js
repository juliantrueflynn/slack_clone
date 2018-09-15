import {
  all,
  call,
  fork,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { createUserAppearance, destroyUserAppearance } from '../actions/userAppearanceActions';
import { USER_APPEARANCE, WORKSPACE } from '../actions/actionTypes';
import { apiCreate, apiDelete } from '../util/apiUtil';

function* fetchCreate({ workspaceSlug }) {
  try {
    yield call(apiCreate, `workspaces/${workspaceSlug}/user_appearance`);
  } catch (error) {
    yield put(createUserAppearance.failure(error));
  }
}

function* fetchDestroy({ workspaceSlug }) {
  try {
    yield call(apiDelete, `workspaces/${workspaceSlug}/user_appearance`);
  } catch (error) {
    yield put(destroyUserAppearance.failure(error));
  }
}

function* fetchWorkspace({ workspace: { workspace } }) {
  try {
    yield put(createUserAppearance.request(workspace.slug));
  } catch (error) {
    yield put(createUserAppearance.failure(error));
  }
}

function* watchCreate() {
  yield takeLatest(USER_APPEARANCE.CREATE.REQUEST, fetchCreate);
}

function* watchDestroy() {
  yield takeLatest(USER_APPEARANCE.DESTROY.REQUEST, fetchDestroy);
}

function* watchWorkspaceShow() {
  yield takeLatest(WORKSPACE.SHOW.RECEIVE, fetchWorkspace);
}

export default function* userAppearanceSaga() {
  yield all([
    fork(watchCreate),
    fork(watchDestroy),
    fork(watchWorkspaceShow),
  ]);
}
