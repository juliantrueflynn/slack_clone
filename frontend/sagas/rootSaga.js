import { fork, all } from 'redux-saga/effects';
import allThreadsSaga from './allThreadsSaga';
import allUnreadsSaga from './allUnreadsSaga';
import channelSaga from './channelSaga';
import channelSubSaga from './channelSubSaga';
import favoriteSaga from './favoriteSaga';
import messageSaga from './messageSaga';
import pinSaga from './pinSaga';
import reactionSaga from './reactionSaga';
import readSaga from './readSaga';
import sessionSaga from './sessionSaga';
import uiSaga from './uiSaga';
import userSaga from './userSaga';
import workspaceSaga from './workspaceSaga';
import workspaceSubSaga from './workspaceSubSaga';

export default function* root() {
  yield all([
    fork(allThreadsSaga),
    fork(allUnreadsSaga),
    fork(channelSaga),
    fork(channelSubSaga),
    fork(favoriteSaga),
    fork(messageSaga),
    fork(pinSaga),
    fork(reactionSaga),
    fork(readSaga),
    fork(sessionSaga),
    fork(uiSaga),
    fork(userSaga),
    fork(workspaceSaga),
    fork(workspaceSubSaga),
  ]);
}
