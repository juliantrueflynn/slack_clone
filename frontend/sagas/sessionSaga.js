import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/sessionActions';
import { SIGN_IN, SIGN_UP, SIGN_OUT } from '../actions/actionTypes';
import { apiCreate, apiDelete } from '../util/apiUtil';

function* fetchSignIn({ currentUser: user }) {
  try {
    const session = yield call(apiCreate, 'session', { user });
    yield put(actions.signInReceive(session));
  } catch (error) {
    yield put(actions.signInFailure(error));
  }
}

function* fetchSignUp({ currentUser: user }) {
  try {
    const session = yield call(apiCreate, 'user', { user });
    yield put(actions.signUpReceive(session));
  } catch (error) {
    yield put(actions.signUpFailure(error));
  }
}

function* fetchSignOut() {
  try {
    yield call(apiDelete, 'session');
    yield put(actions.signOutReceive());
  } catch (error) {
    yield put(actions.signOutFailure(error));
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

export default function* sessionSaga() {
  yield all([
    fork(watchSignIn),
    fork(watchSignUp),
    fork(watchSignOut),
  ]);
}
