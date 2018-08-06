import React from 'react';
import 'sanitize.css';
import { ActionCable } from 'react-actioncable-provider';
import { PageRoutes, routesConfig } from './util/routeUtil';
import './App.css';

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
