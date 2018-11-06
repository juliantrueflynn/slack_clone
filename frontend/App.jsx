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
  faInfoCircle,
  faCog,
  faUsers,
  faUserCog,
  faSearch,
  faEllipsisH,
  faThumbtack,
  faSpinner,
  faQuoteLeft,
  faStar as fasStar,
} from '@fortawesome/free-solid-svg-icons';
import { ActionCable } from 'react-actioncable-provider';
import ReactModal from 'react-modal';
import { Switch } from 'react-router-dom';
import { routesConfig, RouteWithSubRoutes } from './util/routeUtil';
import withActionCable from './components/withActionCable';
import './App.css';

library.add(
  faTimes,
  faTrashAlt,
  faEdit,
  faSquare,
  faEllipsisH,
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
);

class App extends React.Component {
  componentDidMount() {
    ReactModal.setAppElement('#root');
  }

  render() {
    const { isLoggedIn, onReceived } = this.props;

    return (
      <div id="appClient" className="App">
        {isLoggedIn && <ActionCable channel={{ channel: 'AppChannel' }} onReceived={onReceived} />}
        <Switch>
          {routesConfig.map(route => (
            <RouteWithSubRoutes key={route.path} {...route} />
          ))}
        </Switch>
      </div>
    );
  }
}

export default withActionCable(App);
