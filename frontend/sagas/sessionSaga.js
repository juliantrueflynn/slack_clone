import {
  all,
  call,
  fork,
  put,
  takeLatest
} from 'redux-saga/effects';
import * as actions from '../actions/sessionActions';
import { SIGN_IN, SIGN_UP, SIGN_OUT } from '../actions/actionTypes';
import { apiCreate, apiDestroy } from '../util/apiUtil';

function* sessionCreate({ currentUser: user }) {
  try {
    const session = yield call(apiCreate, 'session', { user });
    yield put(actions.signIn.receive(session));
  } catch (error) {
    yield put(actions.signIn.failure(error));
  }
}

function* userCreate({ currentUser: user }) {
  try {
    const session = yield call(apiCreate, 'user', { user });
    yield put(actions.signUp.receive(session));
  } catch (error) {
    yield put(actions.signUp.failure(error));
  }
}

function* sessionDestroy() {
  try {
    yield call(apiDestroy, 'session');
    yield put(actions.signOut.receive());
  } catch (error) {
    yield put(actions.signOut.failure(error));
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
