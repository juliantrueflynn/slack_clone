import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './Root';

// Just for testing, remove!
import * as SessionAPIUtil from './util/session_api_util';
import { signup, signin, logout } from './actions/session_actions';
import * as WorkspaceActions from './actions/workspace_actions';

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

  ReactDOM.render(<Root store={ store } />, rootEl);
});