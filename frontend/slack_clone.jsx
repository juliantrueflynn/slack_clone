import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';

// Just for testing, remove!
import * as SessionAPIUtil from './util/session_api_util';
import { signup, login, logout } from './actions/session_actions';

const Root = <div><h1>Working!</h1></div>;

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');
  const store = configureStore();

  // Just for testing, remove!
  window.SessionAPIUtil = SessionAPIUtil;
  window.signup = signup;
  window.login = login;
  window.logout = logout;
  window.getState = store.getState;
  window.dispatch = store.dispatch;

  ReactDOM.render(Root, rootEl);
});