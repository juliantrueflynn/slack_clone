import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/session_actions';
import * as utilApi from '../util/session_api_util';
import { workspacesRequest } from '../actions/workspace_actions';

function* fetchSignIn({ currentUser }) {
  try {
    const user = yield call(utilApi.signIn, currentUser);
    yield put(actions.receiveCurrentUser(user));
    yield put(workspacesRequest());
  } catch (error) {
    yield put(actions.receiveSessionErrors(error));
  }
}

function* fetchSignUp({ currentUser }) {
  try {
    const user = yield call(utilApi.signUp, currentUser);
    yield put(actions.receiveCurrentUser(user));
  } catch (error) {
    yield put(actions.receiveSessionErrors(error));
  }
}

function* fetchSignOut() {
  try {
    yield call(utilApi.signOut);
    yield put(actions.receiveCurrentUser(null));
  } catch (error) {
    yield put(actions.receiveSessionErrors(error));
  }
}

function* watchSignIn() {
  yield takeLatest(actions.SIGN_IN, fetchSignIn);
}

function* watchSignUp() {
  yield takeLatest(actions.SIGN_UP, fetchSignUp);
}

function* watchSignOut() {
  yield takeLatest(actions.SIGN_OUT, fetchSignOut);
}

export function* sessionSaga() {
  yield all([
    fork(watchSignIn),
    fork(watchSignUp),
    fork(watchSignOut)
  ]);
}