import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './root';

// Just for testing, remove!
import * as SessionAPIUtil from './util/session_api_util';
import { signup, signin, logout } from './actions/session_actions';
import * as WorkspaceActions from './actions/workspace_actions';
import * as ChannelActions from './actions/channel_actions';
import * as WorkspaceSubActions from './actions/workspace_sub_actions';

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
  window.SessionAPIUtil = SessionAPIUtil;
  window.signup = signup;
  window.signin = signin;
  window.logout = logout;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.WorkspaceActions = WorkspaceActions;
  window.ChannelActions = ChannelActions;
  window.WorkspaceSubActions = WorkspaceSubActions;

  ReactDOM.render(<Root store={ store } />, rootEl);
});