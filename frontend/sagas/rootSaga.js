import { fork, all } from 'redux-saga/effects';
import sessionSaga from './sessionSaga';
import workspaceSaga from './workspaceSaga';
import channelSaga from './channelSaga';
import channelSubSaga from './channelSubSaga';
import workspaceSubSaga from './workspaceSubSaga';
import messageSaga from './messageSaga';
import userSaga from './userSaga';
import userThreadSaga from './userThreadSaga';
import favoriteSaga from './favoriteSaga';
import navigateSaga from './navigateSaga';
import reactionSaga from './reactionSaga';
import unreadSaga from './unreadSaga';
import readSaga from './readSaga';
import searchSaga from './searchSaga';

export default function* root() {
  yield all([
    fork(navigateSaga),
    fork(sessionSaga),
    fork(workspaceSaga),
    fork(channelSaga),
    fork(channelSubSaga),
    fork(workspaceSubSaga),
    fork(messageSaga),
    fork(userSaga),
    fork(userThreadSaga),
    fork(favoriteSaga),
    fork(reactionSaga),
    fork(unreadSaga),
    fork(readSaga),
    fork(searchSaga),
  ]);
}
