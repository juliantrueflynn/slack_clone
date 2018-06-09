import { call, takeLatest } from 'redux-saga/effects';
import { NAVIGATE } from '../actions/actionTypes';
import navigateTo from '../util/navigateUtil';

function* fetchNavigate({ params }) {
  yield call(navigateTo, params);
}

export function* navigateSaga() {
  yield takeLatest(NAVIGATE, fetchNavigate);
}
