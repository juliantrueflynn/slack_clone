import React from 'react';
import { PageRoutes } from './util/routeUtil';
import { AppActionCable } from './util/actionCableUtil';
import './App.css';
import 'sanitize.css';

const App = () => (
  <div className="app">
    <PageRoutes />
    <AppActionCable />
  </div>
);

export default App;