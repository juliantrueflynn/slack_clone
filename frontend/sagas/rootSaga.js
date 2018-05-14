import { fork, all } from 'redux-saga/effects';
import { sessionSaga } from './sessionSaga';
import { workspaceSaga } from './workspaceSaga';
import { channelSaga } from './channelSaga';
import { channelSubSaga } from './channelSubSaga';
import { messageSaga } from './messageSaga';
import { navigateSaga } from './navigateSaga';

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