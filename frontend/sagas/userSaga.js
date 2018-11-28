import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest
} from 'redux-saga/effects';
import {
  USER,
  WORKSPACE,
  USER_APPEARANCE,
  PASSWORD,
} from '../actions/actionTypes';
import * as actions from '../actions/userActions';
import * as api from '../util/apiUtil';
import { createSuccess } from '../actions/uiActions';
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
    yield put(createSuccess('user', 'Profile successfully updated'));
  } catch (error) {
    yield put(actions.updateUser.failure(error));
  }
}

function* loadPasswordChange({ password }) {
  try {
    const update = yield call(api.apiUpdate, 'password', password);
    yield put(actions.updatePassword.receive(update));
    yield put(createSuccess('password', 'Password successfully updated'));
  } catch (error) {
    yield put(actions.updatePassword.failure(error));
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

function* watchPasswordChange() {
  yield takeLatest(PASSWORD.UPDATE.REQUEST, loadPasswordChange);
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
    fork(watchPasswordChange),
    fork(watchCreateAppearance),
    fork(watchWorkspaceShow),
  ]);
}
