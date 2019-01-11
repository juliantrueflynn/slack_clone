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
import { updateFormSuccess } from '../actions/uiActions';
import { selectUIByDisplay, getCurrentUser } from '../reducers/selectors';

function* userShow({ userSlug }) {
  try {
    const workspaceSlug = yield select(selectUIByDisplay, 'displayWorkspaceSlug');
    const response = yield call(api.apiFetch, `workspaces/${workspaceSlug}/users/${userSlug}`);
    yield put(actions.fetchUser.receive(response));
  } catch (error) {
    yield put(actions.fetchUser.failure(error));
  }
}

function* userUpdate({ user: body }) {
  try {
    const currUser = yield select(getCurrentUser);
    const args = { method: 'PATCH', body };
    yield call(api.fetchPromise, `users/${currUser.slug}`, args);
    yield put(updateFormSuccess('Profile successfully updated'));
  } catch (error) {
    yield put(actions.updateUser.failure(error));
  }
}

function* passwordUpdate({ password }) {
  try {
    const response = yield call(api.apiUpdate, 'password', password);
    yield put(actions.updatePassword.receive(response));
    yield put(updateFormSuccess('Password successfully updated'));
  } catch (error) {
    yield put(actions.updatePassword.failure(error));
  }
}

function* userAppearanceCreate({ workspaceId }) {
  try {
    yield call(api.apiCreate, 'user_appearance', { workspaceId });
  } catch (error) {
    yield put(actions.createUserAppearance.failure(error));
  }
}

function* userAppearanceCreateByWorkspaceShow({ workspace: { workspace } }) {
  try {
    yield put(actions.createUserAppearance.request(workspace.id));
  } catch (error) {
    yield put(actions.createUserAppearance.failure(error));
  }
}

function* watchUserShowRequest() {
  yield takeLatest(USER.SHOW.REQUEST, userShow);
}

function* watchUserUpdateRequest() {
  yield takeLatest(USER.UPDATE.REQUEST, userUpdate);
}

function* watchPasswordUpdateRequest() {
  yield takeLatest(PASSWORD.UPDATE.REQUEST, passwordUpdate);
}

function* watchUserAppearanceCreateRequest() {
  yield takeLatest(USER_APPEARANCE.CREATE.REQUEST, userAppearanceCreate);
}

function* watchWorkspaceShowRequest() {
  yield takeLatest(WORKSPACE.SHOW.RECEIVE, userAppearanceCreateByWorkspaceShow);
}

export default function* memberSaga() {
  yield all([
    fork(watchUserShowRequest),
    fork(watchUserUpdateRequest),
    fork(watchPasswordUpdateRequest),
    fork(watchUserAppearanceCreateRequest),
    fork(watchWorkspaceShowRequest),
  ]);
}
