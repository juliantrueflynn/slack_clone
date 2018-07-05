import React from 'react';
import 'sanitize.css';
import './App.css';
import { PageRoutes } from './util/routeUtil';
import ActionCablesContainer from './components/ActionCablesContainer';

const App = () => (
  <div className="app">
    <PageRoutes />
    <ActionCablesContainer />
  </div>
);

export default App;
