import {
  all,
  call,
  fork,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { createPin, destroyPin } from '../actions/pinActions';
import { PIN } from '../actions/actionTypes';
import { apiCreate, apiDestroy } from '../util/apiUtil';

function* loadCreatePin({ pin }) {
  try {
    yield call(apiCreate, 'pins', pin);
  } catch (error) {
    yield put(createPin.failure(error));
  }
}

function* loadDestroyPin({ id }) {
  try {
    yield call(apiDestroy, `pins/${id}`);
  } catch (error) {
    yield put(destroyPin.failure(error));
  }
}

function* watchCreateReaction() {
  yield takeLatest(PIN.CREATE.REQUEST, loadCreatePin);
}

function* watchDeleteReaction() {
  yield takeLatest(PIN.DESTROY.REQUEST, loadDestroyPin);
}

export default function* pinSaga() {
  yield all([
    fork(watchCreateReaction),
    fork(watchDeleteReaction),
  ]);
}
