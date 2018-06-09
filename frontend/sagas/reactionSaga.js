import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/reactionActions';
import { DELETE_REACTION, CREATE_REACTION } from '../actions/actionTypes';
import * as api from '../util/reactionAPIUtil';

function* fetchCreateReaction({ reaction }) {
  try {
    yield call(api.createReaction, reaction);
  } catch (error) {
    yield put(actions.createReactionFailure(error));
  }
}

function* fetchDeleteReaction({ reactionId }) {
  try {
    yield call(api.deleteReaction, reactionId);
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
