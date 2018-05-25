import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/sessionActions';
import * as api from '../util/sessionAPIUtil';
import { workspacesRequest } from '../actions/workspaceActions';
import { navigate } from '../actions/navigateActions';

function* fetchSignIn({ currentUser }) {
  try {
    const user = yield call(api.signIn, currentUser);
    yield put(actions.signInReceive(user));
  } catch (error) {
    yield put(actions.signInFailure(error));
  }
}

function* fetchSignUp({ currentUser }) {
  try {
    const user = yield call(api.signUp, currentUser);
    yield put(actions.signUpReceive(user));
  } catch (error) {
    yield put(actions.signUpFailure(error));
  }
}

function* fetchSignOut() {
  try {
    yield call(api.signOut);
    yield put(actions.signOutReceive());
  } catch (error) {
    yield put(actions.sessionFailure(error));
  }
}

function* watchSignIn() {
  yield takeLatest(actions.SIGN_IN_REQUEST, fetchSignIn);
}

function* watchSignUp() {
  yield takeLatest(actions.SIGN_UP_REQUEST, fetchSignUp);
}

function* watchSignOut() {
  yield takeLatest(actions.SIGN_OUT_REQUEST, fetchSignOut);
}

export function* sessionSaga() {
  yield all([
    fork(watchSignIn),
    fork(watchSignUp),
    fork(watchSignOut)
  ]);
}