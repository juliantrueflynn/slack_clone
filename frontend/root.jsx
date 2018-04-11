import "regenerator-runtime/runtime";
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './app';

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root_reducer';
import rootSaga from './sagas/root_saga';

// Just for testing, remove!
import * as WorkspaceActions from './actions/workspace_actions';
import * as ChannelActions from './actions/channel_actions';
import * as WorkspaceSubActions from './actions/workspace_sub_actions';
import * as WorkspaceAPIUtil from './util/workspace_api_util';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, thunk];

if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

let preloadedState = {};
if (window.currentUser) {
  preloadedState = { session: { currentUser: window.currentUser } };
}

const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);

if (window.currentUser) {
  delete window.currentUser;
}

// Just for testing, remove!
window.getState = store.getState;
window.dispatch = store.dispatch;
window.WorkspaceActions = WorkspaceActions;
window.ChannelActions = ChannelActions;
window.WorkspaceSubActions = WorkspaceSubActions;
window.WorkspaceAPIUtil = WorkspaceAPIUtil;

const Root = () => (
  <Provider store={ store }>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);

export default Root;