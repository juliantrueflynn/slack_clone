import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions/reactionActions';
import * as api from '../util/reactionAPIUtil';

function* fetchCreateReaction({ reaction }) {
  try {
    const newReaction = yield call(api.createReaction, reaction);
    // yield put(actions.createReactionReceive(newReaction));
  } catch (error) {
    yield put(actions.createReactionFailure(error));
  }
}

function* fetchDeleteReaction({ reactionId }) {
  try {
    const reaction = yield call(api.deleteReaction, reactionId);
    // yield put(actions.deleteReactionReceive(reaction));
  } catch (error) {
    yield put(actions.deleteReactionFailure(error));
  }
}

function* watchCreateReaction() {
  yield takeLatest(actions.CREATE_REACTION_REQUEST, fetchCreateReaction);
}

function* watchDeleteReaction() {
  yield takeLatest(actions.DELETE_REACTION_REQUEST, fetchDeleteReaction);
}

export function* reactionSaga() {
  yield all([
    fork(watchCreateReaction),
    fork(watchDeleteReaction),
  ]);
}