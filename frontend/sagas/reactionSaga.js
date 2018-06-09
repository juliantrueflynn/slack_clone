import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/reactionActions';
import { DELETE_REACTION, CREATE_REACTION } from '../actions/actionTypes';
import { apiCreate, apiDelete } from '../util/apiUtil';

function* fetchCreateReaction({ reaction }) {
  try {
    yield call(apiCreate, 'reactions', reaction);
  } catch (error) {
    yield put(actions.createReactionFailure(error));
  }
}

function* fetchDeleteReaction({ reactionId }) {
  try {
    yield call(apiDelete, 'reactions', reactionId);
  } catch (error) {
    yield put(actions.deleteReactionFailure(error));
  }
}

function* watchCreateReaction() {
  yield takeLatest(CREATE_REACTION.REQUEST, fetchCreateReaction);
}

function* watchDeleteReaction() {
  yield takeLatest(DELETE_REACTION.REQUEST, fetchDeleteReaction);
}

export function* reactionSaga() {
  yield all([
    fork(watchCreateReaction),
    fork(watchDeleteReaction),
  ]);
}
