import { fork, all } from 'redux-saga/effects';
import { workspaceSaga } from './workspace_saga';

// export default function* root() {
//   yield all([fork(workspaceSaga)]);
// }

const sagas = [workspaceSaga];

export const rootSaga = sagaMiddleware =>
  sagas.forEach(sagaMiddleware.run.bind(sagaMiddleware));