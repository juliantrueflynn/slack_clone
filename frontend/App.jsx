import React from 'react';
import 'sanitize.css';
import { ActionCable } from 'react-actioncable-provider';
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
  faTrashAlt,
  faEdit,
  faSquare,
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleActionCableReceive = this.handleActionCableReceive.bind(this);
  }

  handleActionCableReceive(received) {
    const { dispatch } = this.props;
    dispatch(received);
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="App">
        <PageRoutes routes={routesConfig} />
        {currentUser && (
          <ActionCable
            channel={{ channel: 'AppChannel' }}
            onReceived={this.handleActionCableReceive}
          />
        )}
      </div>
    );
  }
}

export default App;
