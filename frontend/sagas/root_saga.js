import { fork, all } from 'redux-saga/effects';
import { sessionSaga } from './session_saga';
import { workspaceSaga } from './workspace_saga';
import { channelSaga } from './channel_saga';
import { channelSubSaga } from './channelSubSaga';
import { messageSaga } from './message_saga';
import { navigateSaga } from './navigate_saga';

export default function* root() {
  yield all([
    fork(navigateSaga),
    fork(sessionSaga),
    fork(workspaceSaga),
    fork(channelSaga),
    fork(channelSubSaga),
    fork(messageSaga),
  ]);
}