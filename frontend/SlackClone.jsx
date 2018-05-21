import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './Root';
import rootSaga from './sagas/rootSaga';

// Just for testing, remove!
import * as WorkspaceActions from './actions/workspaceActions';
import * as WorkspaceAPIUtil from './util/workspaceAPIUtil';
import * as WorkspaceSubActions from './actions/workspaceSubActions';
import * as ChannelActions from './actions/channelActions';
import * as ChannelAPIUtil from './util/channelAPIUtil';
import * as MessageAPIUtil from './util/messageAPIUtil';
import * as MessageActions from './actions/messageActions';
import * as FavoriteAPIUtil from './util/favoriteAPIUtil';
import * as FavoriteActions from './actions/favoriteActions';

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
    window.WorkspaceAPIUtil = WorkspaceAPIUtil;
    window.WorkspaceSubActions = WorkspaceSubActions;
    window.ChannelActions = ChannelActions;
    window.ChannelAPIUtil = ChannelAPIUtil;
    window.MessageActions = MessageActions;
    window.MessageAPIUtil = MessageAPIUtil;
    window.FavoriteActions = FavoriteActions;
    window.FavoriteAPIUtil = FavoriteAPIUtil;
  }

  ReactDOM.render(<Root store={store} />, rootEl);
});