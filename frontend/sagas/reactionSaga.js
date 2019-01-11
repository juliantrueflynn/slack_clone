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

function* getMatchingReactionByUser({ slug, reactionIds }, emoji) {
  const currUser = yield select(getCurrentUser);
  const reactionsMap = yield select(selectEntities, 'reactions');

  const matches = reactionIds.map(id => reactionsMap[id]).filter(reaction => (
    reaction.userSlug === currUser.slug
    && reaction.messageSlug === slug
    && reaction.emoji === emoji
  ));

  return matches[0];
}

function* reactionToggle({ reaction: { messageSlug, emoji } }) {
  try {
    const msg = yield select(getMessagesMap)[messageSlug];
    const matchingReaction = yield getMatchingReactionByUser(msg, emoji);

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

function* reactionCreate({ reaction }) {
  try {
    yield call(apiCreate, 'reactions', reaction);
  } catch (error) {
    yield put(createReaction.failure(error));
  }
}

function* reactionDestroy({ id }) {
  try {
    yield call(apiDestroy, `reactions/${id}`);
  } catch (error) {
    yield put(destroyReaction.failure(error));
  }
}

function* watchReactionToggle() {
  yield takeLatest(REACTION_TOGGLE, reactionToggle);
}

function* watchReactionCreateRequest() {
  yield takeLatest(REACTION.CREATE.REQUEST, reactionCreate);
}

function* watchReactionDestroyRequest() {
  yield takeLatest(REACTION.DESTROY.REQUEST, reactionDestroy);
}

export default function* reactionSaga() {
  yield all([
    fork(watchReactionToggle),
    fork(watchReactionCreateRequest),
    fork(watchReactionDestroyRequest),
  ]);
}
