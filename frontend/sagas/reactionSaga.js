import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import * as actions from '../actions/reactionActions';
import { REACTION } from '../actions/actionTypes';
import { apiCreate, apiDelete } from '../util/apiUtil';
import { selectReactionByMessageEmoji } from '../reducers/selectors';

function* fetchDeleteReaction({ id }) {
  try {
    yield call(apiDelete, `reactions/${id}`);
  } catch (error) {
    yield put(actions.deleteReaction.failure(error));
  }
}

function* fetchCreateReaction({ reaction }) {
  try {
    const reactionExists = yield select(selectReactionByMessageEmoji, reaction);

    if (reactionExists) {
      const { id } = reactionExists;
      yield fetchDeleteReaction({ id });
    } else {
      yield call(apiCreate, 'reactions', reaction);
    }
  } catch (error) {
    yield put(actions.createReaction.failure(error));
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
