import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/sessionActions';
import { SIGN_IN, SIGN_UP, SIGN_OUT } from '../actions/actionTypes';
import * as api from '../util/sessionAPIUtil';

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
  yield takeLatest(SIGN_IN.REQUEST, fetchSignIn);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP.REQUEST, fetchSignUp);
}

function* watchSignOut() {
  yield takeLatest(SIGN_OUT.REQUEST, fetchSignOut);
}

export function* sessionSaga() {
  yield all([
    fork(watchSignIn),
    fork(watchSignUp),
    fork(watchSignOut)
  ]);
}
