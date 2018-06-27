import { call, put, takeLatest } from 'redux-saga/effects';
import { createThreadMessage } from '../actions/messageActions';
import { THREAD_MESSAGE } from '../actions/actionTypes';
import { apiCreate } from '../util/apiUtil';

function* fetchNewMessage({ message, parentMessageSlug }) {
  try {
    yield call(apiCreate, `messages/${parentMessageSlug}/create_thread_message`, { message });
  } catch (error) {
    yield put(createThreadMessage.failure(error));
  }
}

export default function* messageThreadSaga() {
  yield takeLatest(THREAD_MESSAGE.CREATE.REQUEST, fetchNewMessage);
}
