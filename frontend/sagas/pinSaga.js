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

function* pinCreate({ pin }) {
  try {
    yield call(apiCreate, 'pins', pin);
  } catch (error) {
    yield put(createPin.failure(error));
  }
}

function* pinDestroy({ id }) {
  try {
    yield call(apiDestroy, `pins/${id}`);
  } catch (error) {
    yield put(destroyPin.failure(error));
  }
}

function* watchPinCreateRequest() {
  yield takeLatest(PIN.CREATE.REQUEST, pinCreate);
}

function* watchPinDestroyRequest() {
  yield takeLatest(PIN.DESTROY.REQUEST, pinDestroy);
}

export default function* pinSaga() {
  yield all([
    fork(watchPinCreateRequest),
    fork(watchPinDestroyRequest),
  ]);
}
