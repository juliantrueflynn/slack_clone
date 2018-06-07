import { call, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/navigateActions';
import navigateTo from '../util/navigateUtil';

function* fetchNavigate({ params }) {
  yield navigateTo(params);
}

export function* navigateSaga() {
  yield takeLatest(actions.NAVIGATE, fetchNavigate);
}