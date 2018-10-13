import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest
} from 'redux-saga/effects';
import { USER } from '../actions/actionTypes';
import { fetchUser, updateUser } from '../actions/memberActions';
import { apiFetch, fetchPromise } from '../util/apiUtil';
import { selectUIByDisplay, selectCurrentUser } from '../reducers/selectors';

function* loadFetchMember({ userSlug }) {
  try {
    const workspaceSlug = yield select(selectUIByDisplay, 'displayWorkspaceSlug');
    const user = yield call(apiFetch, `workspaces/${workspaceSlug}/users/${userSlug}`);
    yield put(fetchUser.receive(user));
  } catch (error) {
    yield put(fetchUser.failure(error));
  }
}

function* loadUpdateMember({ user: body }) {
  try {
    const currUser = yield select(selectCurrentUser);
    const args = { method: 'PATCH', body };
    yield call(fetchPromise, `users/${currUser.slug}`, args);
  } catch (error) {
    yield put(updateUser.failure(error));
  }
}

function* watchShowUser() {
  yield takeLatest(USER.SHOW.REQUEST, loadFetchMember);
}

function* watchUpdateUser() {
  yield takeLatest(USER.UPDATE.REQUEST, loadUpdateMember);
}

export default function* memberSaga() {
  yield all([
    fork(watchShowUser),
    fork(watchUpdateUser),
  ]);
}
