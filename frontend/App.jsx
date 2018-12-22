import React from 'react';
import 'sanitize.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit as farEdit,
  faTrashAlt,
  faSmile,
  faComment,
  faSmileBeam,
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
import { ActionCable } from 'react-actioncable-provider';
import withActionCable from './components/withActionCable';
import { routesConfig, PageRoutes } from './util/routeUtil';
import ModalControllerContainer from './components/ModalControllerContainer';
import './App.css';

library.add(
  faSmileBeam,
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

const App = ({ isLoggedIn, onReceived }) => (
  <div className="App">
    {isLoggedIn && <ActionCable channel={{ channel: 'AppChannel' }} onReceived={onReceived} />}
    <PageRoutes routes={routesConfig} />
    <ModalControllerContainer />
  </div>
);

export default withActionCable(App);
