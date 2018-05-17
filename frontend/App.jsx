import React from 'react';
import NavBarContainer from './components/NavBarContainer';
import { ChannelsActionCables } from './util/actionCableUtil';
import { PageRoutes } from './util/routeUtil';
import './App.css';
import 'sanitize.css';

const App = props => (
  <div className="app">
    <ChannelsActionCables />
    <PageRoutes />
  </div>
);

export default App;