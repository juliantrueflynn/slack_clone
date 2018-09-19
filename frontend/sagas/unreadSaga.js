import {
  all,
  fork,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { CLEAR_UNREADS } from '../actions/actionTypes';
import { fetchUpdate } from './readSaga';
import { selectEntityBySlug } from '../reducers/selectors';

function* fetchClearUnreads({ channelSlug }) {
  const currChannel = yield select(selectEntityBySlug, 'channels', channelSlug);
  const { readId } = currChannel;
  yield fetchUpdate({ readId });
}

function* watchClearUnreads() {
  yield takeLatest(CLEAR_UNREADS, fetchClearUnreads);
}

export default function* unreadSaga() {
  yield all([
    fork(watchClearUnreads),
  ]);
}
