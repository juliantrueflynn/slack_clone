import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { createReaction, destroyReaction } from '../actions/reactionActions';
import { REACTION, REACTION_TOGGLE } from '../actions/actionTypes';
import { apiCreate, apiDestroy } from '../util/apiUtil';
import { selectCurrentUser, selectMessagesMap } from '../reducers/selectors';

function* matchingReactionByUser({ id, reactions }, emoji) {
  const currUser = yield select(selectCurrentUser);
  const matches = reactions.filter(reaction => (
    reaction.userId === currUser.id
    && reaction.messageId === id
    && reaction.emoji === emoji
  ));

  return matches[0];
}

function* loadToggleReaction({ reaction: { messageSlug, emoji } }) {
  try {
    const messagesMap = yield select(selectMessagesMap);
    const message = messagesMap[messageSlug];
    const matchingReaction = yield matchingReactionByUser(message, emoji);

    if (matchingReaction) {
      yield put(destroyReaction.request(matchingReaction.id));
    } else {
      const reactionProps = { messageId: message.id, emoji };
      yield put(createReaction.request(reactionProps));
    }
  } catch (error) {
    yield put(createReaction.failure(error));
  }
}

function* loadDestroyReaction({ id }) {
  try {
    yield call(apiDestroy, `reactions/${id}`);
  } catch (error) {
    yield put(destroyReaction.failure(error));
  }
}

function* loadCreateReaction({ reaction }) {
  try {
    yield call(apiCreate, 'reactions', reaction);
  } catch (error) {
    yield put(createReaction.failure(error));
  }
}

function* watchToggleReaction() {
  yield takeLatest(REACTION_TOGGLE, loadToggleReaction);
}

function* watchCreateReaction() {
  yield takeLatest(REACTION.CREATE.REQUEST, loadCreateReaction);
}

function* watchDeleteReaction() {
  yield takeLatest(REACTION.DESTROY.REQUEST, loadDestroyReaction);
}

export default function* reactionSaga() {
  yield all([
    fork(watchToggleReaction),
    fork(watchCreateReaction),
    fork(watchDeleteReaction),
  ]);
}
