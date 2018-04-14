import { fork, all } from 'redux-saga/effects';
import { sessionSaga } from './session_saga';
import { workspaceSaga } from './workspace_saga';
import { channelSaga } from './channel_saga';

export default function* root() {
  yield all([
    fork(sessionSaga),
    fork(workspaceSaga),
    fork(channelSaga)
  ]);
}