import React from 'react';
import 'sanitize.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit,
  faTrashAlt,
  faSmile,
  faComment,
  faCircle as farCircle,
  faStar as farStar
} from '@fortawesome/free-regular-svg-icons';
import {
  faTimes,
  faTimesCircle,
  faCircle,
  faAlignLeft,
  faPlusCircle,
  faHashtag,
  faSquare,
  faStar as fasStar
} from '@fortawesome/free-solid-svg-icons';
import { PageRoutes, routesConfig } from './util/routeUtil';
import './App.css';

library.add(
  faTimes,
  faTrashAlt,
  faEdit,
  faSquare,
  faTimesCircle,
  farCircle,
  faPlusCircle,
  faHashtag,
  faAlignLeft,
  farStar,
  fasStar,
  faSmile,
  faComment,
  faCircle
);

const App = () => (
  <div className="App">
    <PageRoutes routes={routesConfig} />
  </div>
);

export default App;
