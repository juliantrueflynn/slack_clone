import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './root';

// Just for testing, remove!
import * as WorkspaceActions from './actions/workspace_actions';
import * as ChannelActions from './actions/channel_actions';
import * as WorkspaceSubActions from './actions/workspace_sub_actions';
import * as WorkspaceAPIUtil from './util/workspace_api_util';

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

  // Just for testing, remove!
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.WorkspaceActions = WorkspaceActions;
  window.ChannelActions = ChannelActions;
  window.WorkspaceSubActions = WorkspaceSubActions;
  window.WorkspaceAPIUtil = WorkspaceAPIUtil;

  ReactDOM.render(<Root store={ store } />, rootEl);
});