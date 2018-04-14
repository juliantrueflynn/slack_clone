import { fork, all } from 'redux-saga/effects';
import { workspaceSaga } from './workspace_saga';
import { channelSaga } from './channel_saga';

export default function* root() {
  yield all([
    fork(workspaceSaga),
    fork(channelSaga)
  ]);
}