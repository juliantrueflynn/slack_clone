import { put, takeLatest, call } from 'redux-saga/effects';
import { READ } from '../actions/actionTypes';
import { apiUpdate } from '../util/apiUtil';
import readUpdate from '../actions/readActions';

function* loadReadDateTime({ readableId, readableType }) {
  try {
    const newUnread = yield call(apiUpdate, 'read', { readableId, readableType });
    yield put(readUpdate.receive(newUnread));
  } catch (error) {
    yield put(readUpdate.failure(error));
  }
}

export default function* readSaga() {
  yield takeLatest(READ.UPDATE.REQUEST, loadReadDateTime);
}
