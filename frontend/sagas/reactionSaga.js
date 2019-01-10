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
import { getCurrentUser, getMessagesMap, selectEntities } from '../reducers/selectors';

function* matchingReactionByUser({ slug, reactionIds }, emoji) {
  const currUser = yield select(getCurrentUser);
  const reactionsMap = yield select(selectEntities, 'reactions');

  const matches = reactionIds.map(id => reactionsMap[id]).filter(reaction => (
    reaction.userSlug === currUser.slug
    && reaction.messageSlug === slug
    && reaction.emoji === emoji
  ));

  return matches[0];
}

function* loadToggleReaction({ reaction: { messageSlug, emoji } }) {
  try {
    const msgsMap = yield select(getMessagesMap);
    const msg = msgsMap[messageSlug];
    const matchingReaction = yield matchingReactionByUser(msg, emoji);

    if (matchingReaction) {
      yield put(destroyReaction.request(matchingReaction.id));
    } else {
      const reactionProps = { messageId: msg.id, emoji };
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
