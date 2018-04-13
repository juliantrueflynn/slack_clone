import {
  take, all, call, fork, put, takeEvery, select, takeLatest
} from 'redux-saga/effects';
import * as actions from '../actions/channel_actions';
import * as utilApi from '../util/channel_api_util';
import * as subActions from '../actions/channel_sub_actions';
import * as subUtilApi from '../util/channel_sub_api_util';

function* addNewChannel(action) {
  try {
    const newChannel = yield call(
      utilApi.createChannel, action.channel
    );
    yield put(actions.createChannelSuccess(newChannel));
  } catch (error) {
    yield put(actions.receiveChannelErrors(error));
  }
}

function* subCreatorToNewChannel(action) {
  try {
    const { id, ownerId } = action.channel;
    const channelSub = { user_id: ownerId, channel_id: id };
    const newChannelSub = yield call(
      subUtilApi.createChannelSub, channelSub
    );

    yield put(subActions.createChannelSubSuccess(newChannelSub));
    action.channels = [];
    yield put(actions.receiveChannel(action));
  } catch (errors) {
    yield put(subActions.createChannelSubErrors(errors));
  }
}

function* watchCreateChannel() {
  yield takeEvery(actions.CREATE_CHANNEL, addNewChannel);
  yield takeEvery(
    actions.CREATE_CHANNEL_SUCCESS, subCreatorToNewChannel
  );
}

// function* loadChannels(channels) {
//   const prevState = yield select(getChannels);
//   if (!prevState.length || Object.keys(channels).length !== prevState) {
//     yield call(fetchChannels, channels);
//   }
// }

// function* fetchChannels(prevState) {
//   try {
//     const channels = yield call(utilApi.fetchChannels);
//     if (Object.keys(channels).length !== Object.keys(prevState).length) {
//       yield put(actions.receiveChannels(channels));
//     }
//   } catch (error) {
//     yield put(actions.failureChannels([error.message]));
//   }
// }

// function* fetchChannel(channelId) {
//   try {
//     const channel = yield call(utilApi.fetchChannel, channelId);
//     yield put(actions.receiveChannel(channel));
//   } catch (errors) {
//     yield put(actions.failureChannel(errors));
//   }
// }

// function* watchChannelPage() {
//   while(true) {
//     const {
//       channelId, channels
//     } = yield take(actions.LOAD_CHANNEL_PAGE);

//     yield fork(loadChannels, channels);
//     yield fork(fetchChannel, channelId);
//   }
// }

export function* channelSaga() {
  yield all([
    fork(watchCreateChannel),
    // fork(watchChannelPage)
  ]);
}