import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest
} from 'redux-saga/effects';
import { MEMBER } from '../actions/actionTypes';
import { fetchMember } from '../actions/memberActions';
import { apiFetch } from '../util/apiUtil';
import { selectUIByDisplay } from '../reducers/selectors';

function* loadFetchMember({ userSlug }) {
  try {
    const workspaceSlug = yield select(selectUIByDisplay, 'displayWorkspaceSlug');
    const member = yield call(apiFetch, `workspaces/${workspaceSlug}/users/${userSlug}`);
    yield put(fetchMember.receive(member));
  } catch (error) {
    yield put(fetchMember.failure(error));
  }
}

function* watchShowUser() {
  yield takeLatest(MEMBER.SHOW.REQUEST, loadFetchMember);
}

export default function* memberSaga() {
  yield all([
    fork(watchShowUser),
  ]);
}
