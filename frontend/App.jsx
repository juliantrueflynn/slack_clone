import React from 'react';
import {
  ChannelsActionCables,
  WorkspaceActionCable
} from './util/actionCableUtil';
import { PageRoutes } from './util/routeUtil';
import './App.css';
import 'sanitize.css';

const App = props => (
  <div className="app">
    <ChannelsActionCables />
    <WorkspaceActionCable />
    <PageRoutes />
  </div>
);

export default App;