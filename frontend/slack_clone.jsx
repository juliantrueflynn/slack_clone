import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './root';
import rootSaga from './sagas/root_saga';

// Just for testing, remove!
import * as WorkspaceActions from './actions/workspace_actions';
import * as ChannelActions from './actions/channel_actions';
import * as WorkspaceSubActions from './actions/workspace_sub_actions';
import * as WorkspaceAPIUtil from './util/workspace_api_util';
import * as ChannelAPIUtil from './util/channel_api_util';
import * as MessageAPIUtil from './util/message_api_util';
import * as MessageActions from './actions/message_actions';

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');

  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  store.runSaga(rootSaga);

  // Just for testing, remove!
  if (process.env.NODE_ENV !== 'production') {
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    window.WorkspaceActions = WorkspaceActions;
    window.ChannelActions = ChannelActions;
    window.WorkspaceSubActions = WorkspaceSubActions;
    window.WorkspaceAPIUtil = WorkspaceAPIUtil;
    window.ChannelAPIUtil = ChannelAPIUtil;
    window.MessageAPIUtil = MessageAPIUtil;
    window.MessageActions = MessageActions;
  }

  ReactDOM.render(<Root store={ store } />, rootEl);
});