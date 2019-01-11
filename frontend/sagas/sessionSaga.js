import {
  all,
  call,
  fork,
  put,
  takeLatest
} from 'redux-saga/effects';
import { signIn, signUp, signOut } from '../actions/sessionActions';
import { SIGN_IN, SIGN_UP, SIGN_OUT } from '../actions/actionTypes';
import { apiCreate, apiDestroy } from '../util/apiUtil';

function* sessionCreate({ currentUser: user }) {
  try {
    const response = yield call(apiCreate, 'session', { user });
    yield put(signIn.receive(response));
  } catch (error) {
    yield put(signIn.failure(error));
  }
}

function* userCreate({ currentUser: user }) {
  try {
    const response = yield call(apiCreate, 'user', { user });
    yield put(signUp.receive(response));
  } catch (error) {
    yield put(signUp.failure(error));
  }
}

function* sessionDestroy() {
  try {
    yield call(apiDestroy, 'session');
    yield put(signOut.receive());
  } catch (error) {
    yield put(signOut.failure(error));
  }
}

function* watchSignInRequest() {
  yield takeLatest(SIGN_IN.REQUEST, sessionCreate);
}

function* watchSignUpRequest() {
  yield takeLatest(SIGN_UP.REQUEST, userCreate);
}

function* watchSignOutRequest() {
  yield takeLatest(SIGN_OUT.REQUEST, sessionDestroy);
}

export default function* sessionSaga() {
  yield all([
    fork(watchSignInRequest),
    fork(watchSignUpRequest),
    fork(watchSignOutRequest),
  ]);
}
