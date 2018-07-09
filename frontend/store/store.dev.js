import 'regenerator-runtime/runtime';
import createSagaMiddleware, { END } from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import logger from 'redux-logger';
// import { createLogger } from 'redux-logger';

// const logger = createLogger({
//   diff: true,
// });

const configureStore = (preloadedState = {}) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(sagaMiddleware, logger)
  );

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
};

export default configureStore;
