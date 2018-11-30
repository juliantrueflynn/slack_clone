import React from 'react';
import 'sanitize.css';
import classNames from 'classnames';
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
import ReactModal from 'react-modal';
import { ActionCable } from 'react-actioncable-provider';
import withActionCable from './components/withActionCable';
import { routesConfig, PageRoutes } from './util/routeUtil';
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

class App extends React.Component {
  componentDidMount() {
    ReactModal.setAppElement('#root');
  }

  render() {
    const { isLoggedIn, onReceived, match: { isExact } } = this.props;

    const appClassNames = classNames('App', {
      'App--private': !isExact,
    });

    return (
      <div id="appClient" className={appClassNames}>
        {isLoggedIn && <ActionCable channel={{ channel: 'AppChannel' }} onReceived={onReceived} />}
        <PageRoutes routes={routesConfig} />
      </div>
    );
  }
}

export default withActionCable(App);
