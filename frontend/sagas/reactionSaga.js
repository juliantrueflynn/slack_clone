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
import { selectCurrentUser, selectEntities } from '../reducers/selectors';

function* reactionWithEmojiByUser({ messageId, emoji }) {
  const currUser = yield select(selectCurrentUser);
  const reactionsMap = yield select(selectEntities, 'reactions');
  const reactions = Object.values(reactionsMap);

  const messageEmojisByUser = reactions.filter(reaction => (
    reaction.userId === currUser.id
    && reaction.messageId === messageId
    && reaction.emoji === emoji
  ));

  return messageEmojisByUser[0];
}

function* fetchDeleteReaction({ id }) {
  try {
    yield call(apiDelete, `reactions/${id}`);
  } catch (error) {
    yield put(actions.deleteReaction.failure(error));
  }
}

function* fetchCreateReaction({ reaction }) {
  try {
    const reactionExists = yield reactionWithEmojiByUser(reaction);

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
