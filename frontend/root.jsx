import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './app';
import history from './util/history';

const Root = ({ store }) => (
  <Provider store={ store }>
    <Router basename="/" history={ history }>
      <App />
    </Router>
  </Provider>
);

export default Root;