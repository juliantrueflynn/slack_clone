import React from 'react';
import 'sanitize.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSmile, faComment } from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faEdit,
  faHashtag,
  faInfoCircle,
  faThumbtack,
  faTimes,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { routesConfig, PageRoutes } from './util/routeUtil';
import ActionCablesContainer from './components/ActionCablesContainer';
import ModalControllerContainer from './components/ModalControllerContainer';
import './App.css';

library.add(
  faBars,
  faComment,
  faEdit,
  faHashtag,
  faInfoCircle,
  faThumbtack,
  faTimes,
  faStar,
  faSmile,
);

const App = () => (
  <div className="App">
    <PageRoutes routes={routesConfig} />
    <ActionCablesContainer />
    <ModalControllerContainer />
  </div>
);

export default App;
