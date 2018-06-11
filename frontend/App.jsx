import React from 'react';
import 'sanitize.css';
import './App.css';
import { PageRoutes } from './util/routeUtil';
import Socket from './util/actionCableUtil';

const App = () => (
  <div className="app">
    <PageRoutes />
    <Socket channel={{ channel: 'AppChannel' }} />
  </div>
);

export default App;
