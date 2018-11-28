import {
  all,
  call,
  fork,
  put,
  takeLatest
} from 'redux-saga/effects';
import * as actions from '../actions/sessionActions';
import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  PASSWORD,
} from '../actions/actionTypes';
import { apiCreate, apiDelete, apiUpdate } from '../util/apiUtil';

function* fetchSignIn({ currentUser: user }) {
  try {
    const session = yield call(apiCreate, 'session', { user });
    yield put(actions.signIn.receive(session));
  } catch (error) {
    yield put(actions.signIn.failure(error));
  }
}

function* fetchSignUp({ currentUser: user }) {
  try {
    const session = yield call(apiCreate, 'user', { user });
    yield put(actions.signUp.receive(session));
  } catch (error) {
    yield put(actions.signUp.failure(error));
  }
}

function* fetchSignOut() {
  try {
    yield call(apiDelete, 'session');
    yield put(actions.signOut.receive());
  } catch (error) {
    yield put(actions.signOut.failure(error));
  }
}

function* loadPasswordChange({ password }) {
  try {
    const successMessage = yield call(apiUpdate, 'password', password);
    yield put(actions.updatePassword.receive(successMessage));
  } catch (error) {
    yield put(actions.updatePassword.failure(error));
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

function* watchPasswordChange() {
  yield takeLatest(PASSWORD.UPDATE.REQUEST, loadPasswordChange);
}

export default function* sessionSaga() {
  yield all([
    fork(watchSignIn),
    fork(watchSignUp),
    fork(watchSignOut),
    fork(watchPasswordChange),
  ]);
}
