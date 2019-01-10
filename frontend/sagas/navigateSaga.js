import { takeLatest } from 'redux-saga/effects';
import { NAVIGATE } from '../actions/actionTypes';
import history from '../util/history';

function* watchNavigate({ pathname }) {
  yield history.push(pathname);
}

export default function* navigateSaga() {
  yield takeLatest(NAVIGATE, watchNavigate);
}
