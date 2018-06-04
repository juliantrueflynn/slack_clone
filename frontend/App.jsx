import React from 'react';
import {
  ChannelsActionCables,
  WorkspaceActionCable,
  UserActionCable,
  WorkspacesActionCable
} from './util/actionCableUtil';
import { PageRoutes } from './util/routeUtil';
import './App.css';
import 'sanitize.css';

const App = () => (
  <div className="app">
    <ChannelsActionCables />
    <PageRoutes />
  </div>
);

export default App;