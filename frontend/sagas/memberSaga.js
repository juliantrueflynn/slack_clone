import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest
} from 'redux-saga/effects';
import { MEMBER, AVATAR } from '../actions/actionTypes';
import { fetchMember, updateAvatar } from '../actions/memberActions';
import { apiFetch, apiUpload } from '../util/apiUtil';
import { selectUIByDisplay, selectCurrentUser } from '../reducers/selectors';

function* loadFetchMember({ userSlug }) {
  try {
    const workspaceSlug = yield select(selectUIByDisplay, 'displayWorkspaceSlug');
    const member = yield call(apiFetch, `workspaces/${workspaceSlug}/users/${userSlug}`);
    yield put(fetchMember.receive(member));
  } catch (error) {
    yield put(fetchMember.failure(error));
  }
}

function* loadUpdateMember({ imageUrl: body }) {
  try {
    const currUser = yield select(selectCurrentUser);
    const apiArgs = { method: 'PATCH', body };
    yield call(apiUpload, `users/${currUser.slug}/avatar`, apiArgs);
  } catch (error) {
    yield put(updateAvatar.failure(error));
  }
}

function* watchShowUser() {
  yield takeLatest(MEMBER.SHOW.REQUEST, loadFetchMember);
}

function* watchUpdateUser() {
  yield takeLatest(AVATAR.UPDATE.REQUEST, loadUpdateMember);
}

export default function* memberSaga() {
  yield all([
    fork(watchShowUser),
    fork(watchUpdateUser),
  ]);
}
