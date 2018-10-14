import { call, takeLatest } from 'redux-saga/effects';
import { NAVIGATE } from '../actions/actionTypes';
import history from '../util/history';

function navigateTo(path, push) {
  if (push) {
    history.push(path);
  } else {
    history.replace(path);
  }
}

function* fetchNavigate({ path, push }) {
  yield call(navigateTo, path, push);
}

export default function* navigateSaga() {
  yield takeLatest(NAVIGATE, fetchNavigate);
}
