import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

class ActionCables extends React.Component {
  constructor(props) {
    super(props);
    this.handleReceived = this.handleReceived.bind(this);
  }

  handleReceived(received) {
    this.props.actionCableReceive(received);
  }

  render() {
    if (!this.props.currentUser) {
      return null;
    }

    return (
      <Fragment>
        <ActionCable
          onReceived={this.handleReceived}
          channel={{ channel: 'AppChannel' }}
        />
        <ActionCable
          onReceived={this.handleReceived}
          channel={{ channel: 'AppearanceChannel' }}
        />
      </Fragment>
    );
  }
}

export default ActionCables;
