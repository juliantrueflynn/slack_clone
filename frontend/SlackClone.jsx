import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './Root';
import rootSaga from './sagas/rootSaga';

// Just for testing, remove!
import * as WorkspaceActions from './actions/workspaceActions';
import * as ChannelActions from './actions/channelActions';
import * as MessageActions from './actions/messageActions';
import * as FavoriteActions from './actions/favoriteActions';
import * as ReactionActions from './actions/reactionActions';
import * as api from './util/apiUtil';

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
    window.MessageActions = MessageActions;
    window.FavoriteActions = FavoriteActions;
    window.ReactionActions = ReactionActions;
    window.SlackAPI = api;
  }

  ReactDOM.render(<Root store={store} />, rootEl);
});
