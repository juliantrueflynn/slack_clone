import React from 'react';
import { Provider } from 'react-redux';
import { ActionCableProvider } from 'react-actioncable-provider';
import { Router } from 'react-router-dom';
import history from './util/history';
import App from './app';

const Root = ({ store }) => (
  <Provider store={ store }>
    <ActionCableProvider url="ws://localhost:3000/cable">
      <Router basename="/" history={ history }>
        <App />
      </Router>
    </ActionCableProvider>
  </Provider>
);

export default Root;