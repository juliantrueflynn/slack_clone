import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/reactionActions';
import { REACTION } from '../actions/actionTypes';
import { apiCreate, apiDelete } from '../util/apiUtil';

function* fetchCreateReaction({ reaction }) {
  try {
    yield call(apiCreate, 'reactions', reaction);
  } catch (error) {
    yield put(actions.createReaction.failure(error));
  }
}

function* fetchDeleteReaction({ id }) {
  try {
    yield call(apiDelete, `reactions/${id}`);
  } catch (error) {
    yield put(actions.deleteReaction.failure(error));
  }
}

function* watchCreateReaction() {
  yield takeLatest(REACTION.CREATE.REQUEST, fetchCreateReaction);
}

function* watchDeleteReaction() {
  yield takeLatest(REACTION.DESTROY.REQUEST, fetchDeleteReaction);
}

export default function* reactionSaga() {
  yield all([
    fork(watchCreateReaction),
    fork(watchDeleteReaction),
  ]);
}
