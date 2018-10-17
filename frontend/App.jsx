import React from 'react';
import 'sanitize.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEdit,
  faTrashAlt,
  faSmile,
  faComment,
  faUser,
  faCircle as farCircle,
  faStar as farStar,
} from '@fortawesome/free-regular-svg-icons';
import {
  faTimes,
  faTimesCircle,
  faCircle,
  faAlignLeft,
  faPlusCircle,
  faHashtag,
  faSquare,
  faCog,
  faUserCog,
  faStar as fasStar,
} from '@fortawesome/free-solid-svg-icons';
import { ActionCable } from 'react-actioncable-provider';
import { Switch } from 'react-router-dom';
import { routesConfig, RouteWithSubRoutes } from './util/routeUtil';
import withActionCable from './components/withActionCable';
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
  faCircle,
  faCog,
  faUser,
  faUserCog,
);

const App = ({ isLoggedIn, onReceived }) => (
  <div className="App">
    {isLoggedIn && (
      <ActionCable channel={{ channel: 'AppChannel' }} onReceived={onReceived} />
    )}
    <Switch>
      {routesConfig.map(route => (
        <RouteWithSubRoutes key={route.path} {...route} />
      ))}
    </Switch>
  </div>
);

export default withActionCable(App);
