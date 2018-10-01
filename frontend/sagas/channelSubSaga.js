import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { CHANNEL_SUB, MESSAGE } from '../actions/actionTypes';
import * as actions from '../actions/channelActions';
import { apiCreate, apiDelete, apiUpdate } from '../util/apiUtil';
import { selectCurrentUser, selectEntityBySlug, selectEntities } from '../reducers/selectors';

function* fetchCreate({ channelSub }) {
  try {
    yield call(apiCreate, 'channel_subs', channelSub);
  } catch (error) {
    yield put(actions.createChannelSub.failure(error));
  }
}

function* fetchUpdate({ id }) {
  try {
    yield call(apiUpdate, `channel_subs/${id}`);
  } catch (error) {
    yield put(actions.createChannelSub.failure(error));
  }
}

const operations = {
  '===': (op1, op2) => op1 === op2,
  '!==': (op1, op2) => op1 !== op2,
};

function* updateSubFromOperator(chatSlug, operator) {
  const chat = yield select(selectEntityBySlug, 'channels', chatSlug);

  if (chat.hasDm) {
    const user = yield select(selectCurrentUser);
    const channelSubs = yield select(selectEntities, 'channelSubs');
    const ids = chat.subs.filter(id => operations[operator](channelSubs[id].userId, user.id));
    const sub = channelSubs[ids[0]];

    if (sub && !sub.inSidebar) {
      yield put(actions.updateChannelSub.request(sub.id));
    }
  }
}

function* fetchChannelShow({ messages: { channel } }) {
  try {
    yield updateSubFromOperator(channel.slug, '===');
  } catch (error) {
    yield put(actions.updateChannelSub.failure(error));
  }
}

function* fetchDmChatMessage({ message: { message } }) {
  try {
    yield updateSubFromOperator(message.channelSlug, '!==');
  } catch (error) {
    yield put(actions.updateChannelSub.failure(error));
  }
}

function* fetchDestroy({ channelId }) {
  try {
    yield call(apiDelete, `channel_subs/${channelId}`);
  } catch (error) {
    yield put(actions.deleteChannelSub.failure(error));
  }
}

function* watchCreate() {
  yield takeLatest(CHANNEL_SUB.CREATE.REQUEST, fetchCreate);
}

function* watchUpdate() {
  yield takeLatest(CHANNEL_SUB.UPDATE.REQUEST, fetchUpdate);
}

function* watchChannelShow() {
  yield takeLatest(MESSAGE.INDEX.RECEIVE, fetchChannelShow);
}

function* watchDmChatMessage() {
  yield takeLatest(MESSAGE.CREATE.RECEIVE, fetchDmChatMessage);
}

function* watchDestroy() {
  yield takeLatest(CHANNEL_SUB.DESTROY.REQUEST, fetchDestroy);
}

export default function* channelSubSaga() {
  yield all([
    fork(watchCreate),
    fork(watchUpdate),
    fork(watchChannelShow),
    fork(watchDmChatMessage),
    fork(watchDestroy),
  ]);
}
