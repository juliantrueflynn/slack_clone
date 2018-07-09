import React from 'react';
import 'sanitize.css';
import './App.css';
import { PageRoutes, routesConfig } from './util/routeUtil';
import ActionCablesContainer from './components/ActionCablesContainer';

const App = () => (
  <div className="app">
    <PageRoutes routes={routesConfig} />
    <ActionCablesContainer />
  </div>
);

export default App;
