import { fork, all } from 'redux-saga/effects';
import allThreadsSaga from './allThreadsSaga';
import allUnreadsSaga from './allUnreadsSaga';
import sessionSaga from './sessionSaga';
import workspaceSaga from './workspaceSaga';
import channelSaga from './channelSaga';
import channelSubSaga from './channelSubSaga';
import workspaceSubSaga from './workspaceSubSaga';
import messageSaga from './messageSaga';
import pinSaga from './pinSaga';
import userSaga from './userSaga';
import favoriteSaga from './favoriteSaga';
import navigateSaga from './navigateSaga';
import reactionSaga from './reactionSaga';
import readSaga from './readSaga';
import searchSaga from './searchSaga';
import drawerSaga from './drawerSaga';

export default function* root() {
  yield all([
    fork(allThreadsSaga),
    fork(allUnreadsSaga),
    fork(navigateSaga),
    fork(sessionSaga),
    fork(workspaceSaga),
    fork(channelSaga),
    fork(channelSubSaga),
    fork(workspaceSubSaga),
    fork(messageSaga),
    fork(pinSaga),
    fork(userSaga),
    fork(favoriteSaga),
    fork(reactionSaga),
    fork(readSaga),
    fork(searchSaga),
    fork(drawerSaga),
  ]);
}
