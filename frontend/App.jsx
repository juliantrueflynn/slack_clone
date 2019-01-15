import React from 'react';
import 'sanitize.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit as farEdit,
  faTrashAlt,
  faSmile,
  faComment,
  faComments,
  faCircle as farCircle,
  faStar as farStar,
} from '@fortawesome/free-regular-svg-icons';
import {
  faEdit,
  faUser,
  faTimes,
  faTimesCircle,
  faCircle,
  faAlignLeft,
  faPlusCircle,
  faHashtag,
  faSquare,
  faInfoCircle,
  faCircleNotch,
  faCog,
  faUsers,
  faUserCog,
  faSearch,
  faEllipsisH,
  faEllipsisV,
  faThumbtack,
  faSpinner,
  faQuoteLeft,
  faPencilAlt,
  faBars,
  faStar as fasStar,
} from '@fortawesome/free-solid-svg-icons';
import { routesConfig, PageRoutes } from './util/routeUtil';
import ActionCablesContainer from './components/ActionCablesContainer';
import ModalControllerContainer from './components/ModalControllerContainer';
import './App.css';

library.add(
  faComments,
  faTimes,
  faTrashAlt,
  faEdit,
  farEdit,
  faSquare,
  faEllipsisH,
  faEllipsisV,
  faTimesCircle,
  farCircle,
  faPlusCircle,
  faHashtag,
  faAlignLeft,
  farStar,
  fasStar,
  faSmile,
  faSearch,
  faQuoteLeft,
  faComment,
  faInfoCircle,
  faCircleNotch,
  faCircle,
  faCog,
  faUser,
  faUsers,
  faUserCog,
  faThumbtack,
  faSpinner,
  faPencilAlt,
  faBars,
);

const App = () => (
  <div className="App">
    <PageRoutes routes={routesConfig} />
    <ActionCablesContainer />
    <ModalControllerContainer />
  </div>
);

export default App;
