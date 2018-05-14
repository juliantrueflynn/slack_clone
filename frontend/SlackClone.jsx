import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './Root';
import rootSaga from './sagas/rootSaga';

// Just for testing, remove!
import * as WorkspaceActions from './actions/workspaceActions';
import * as ChannelActions from './actions/channelActions';
import * as WorkspaceSubActions from './actions/workspaceSubActions';
import * as WorkspaceAPIUtil from './util/workspaceAPIUtil';
import * as ChannelAPIUtil from './util/channelAPIUtil';
import * as MessageAPIUtil from './util/messageAPIUtil';
import * as MessageActions from './actions/messageActions';

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