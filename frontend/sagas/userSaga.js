import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest
} from 'redux-saga/effects';
import { USER, WORKSPACE, USER_APPEARANCE } from '../actions/actionTypes';
import * as actions from '../actions/userActions';
import * as api from '../util/apiUtil';
import { selectUIByDisplay, selectCurrentUser } from '../reducers/selectors';

function* loadFetchMember({ userSlug }) {
  try {
    const workspaceSlug = yield select(selectUIByDisplay, 'displayWorkspaceSlug');
    const user = yield call(api.apiFetch, `workspaces/${workspaceSlug}/users/${userSlug}`);
    yield put(actions.fetchUser.receive(user));
  } catch (error) {
    yield put(actions.fetchUser.failure(error));
  }
}

function* loadUpdateMember({ user: body }) {
  try {
    const currUser = yield select(selectCurrentUser);
    const args = { method: 'PATCH', body };
    yield call(api.fetchPromise, `users/${currUser.slug}`, args);
  } catch (error) {
    yield put(actions.updateUser.failure(error));
  }
}

function* fetchCreateAppearance({ workspaceId }) {
  try {
    yield call(api.apiCreate, 'user_appearance', { workspaceId });
  } catch (error) {
    yield put(actions.createUserAppearance.failure(error));
  }
}

function* fetchWorkspace({ workspace: { workspace } }) {
  try {
    yield put(actions.createUserAppearance.request(workspace.id));
  } catch (error) {
    yield put(actions.createUserAppearance.failure(error));
  }
}

function* watchShowUser() {
  yield takeLatest(USER.SHOW.REQUEST, loadFetchMember);
}

function* watchUpdateUser() {
  yield takeLatest(USER.UPDATE.REQUEST, loadUpdateMember);
}

function* watchCreateAppearance() {
  yield takeLatest(USER_APPEARANCE.CREATE.REQUEST, fetchCreateAppearance);
}

function* watchWorkspaceShow() {
  yield takeLatest(WORKSPACE.SHOW.RECEIVE, fetchWorkspace);
}

export default function* memberSaga() {
  yield all([
    fork(watchShowUser),
    fork(watchUpdateUser),
    fork(watchCreateAppearance),
    fork(watchWorkspaceShow),
  ]);
}
