import { call, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/navigateActions';
import navigateTo from '../util/navigateUtil';

function* fetchNavigate({ path }) {
  yield navigateTo(path);
}

export function* navigateSaga() {
  yield takeLatest(actions.NAVIGATE, fetchNavigate);
}