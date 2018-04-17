import { call, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/navigate_actions';
import navigateTo from '../util/navigate_util';

function* fetchNavigate({ path }) {
  yield navigateTo(path);
}

export function* navigateSaga() {
  yield takeLatest(actions.NAVIGATE, fetchNavigate);
}