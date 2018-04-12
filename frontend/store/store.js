import "regenerator-runtime/runtime";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root_reducer';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../sagas/root_saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, thunk];

if (process.env.NODE_ENV !== 'production') {
  // must use 'require' (import only allowed at top of file)
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const configureStore = (preloadedState = {}) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares)
  );

  rootSaga(sagaMiddleware);

  return store;
};

export default configureStore;