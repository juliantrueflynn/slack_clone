import {
  all,
  call,
  fork,
  put,
  takeLatest,
} from 'redux-saga/effects';
import * as actions from '../actions/userAppearanceActions';
import { USER_APPEARANCE } from '../actions/actionTypes';
import { apiCreate } from '../util/apiUtil';

function* fetchCreate({ userAppearance }) {
  try {
    yield call(apiCreate, 'user_appearance', userAppearance);
  } catch (error) {
    yield put(actions.createUserAppearance.failure(error));
  }
}

function* watchCreate() {
  yield takeLatest(USER_APPEARANCE.CREATE.REQUEST, fetchCreate);
}

export default function* userAppearanceSaga() {
  yield all([
    fork(watchCreate),
  ]);
}
