import React from 'react';
import { Provider } from 'react-redux';
import { ActionCableProvider } from 'react-actioncable-provider';
import { Router } from 'react-router-dom';
import history from './util/history';
import App from './App';

let cable = 'ws://localhost:3000/cable';
if (process.env.NODE_ENV === 'production') {
  cable = 'wss://slack-clone-julian.herokuapp.com/cable';
}

const Root = ({ store }) => (
  <Provider store={store}>
    <ActionCableProvider url={cable}>
      <Router basename="/" history={history}>
        <App
          dispatch={store.dispatch}
          currentUser={store.getState().session.currentUser}
        />
      </Router>
    </ActionCableProvider>
  </Provider>
);

export default Root;
