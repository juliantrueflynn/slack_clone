import React from 'react';
import 'sanitize.css';
import { ActionCable } from 'react-actioncable-provider';
import './App.css';
import { PageRoutes, routesConfig } from './util/routeUtil';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleActionCableReceive = this.handleActionCableReceive.bind(this);
  }

  handleActionCableReceive(received) {
    this.props.dispatch(received);
  }

  render() {
    return (
      <div className="app">
        <PageRoutes routes={routesConfig} />
        {this.props.isLoggedIn && (
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
