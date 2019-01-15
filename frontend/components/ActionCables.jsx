import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { decamelizeKeys, camelizeKeys } from 'humps';

class ActionCables extends React.Component {
  constructor(props) {
    super(props);
    this.handleReceived = this.handleReceived.bind(this);
  }

  handleReceived(received) {
    const { actionCableReceive } = this.props;
    const payload = camelizeKeys(received);

    actionCableReceive(payload);
  }

  render() {
    const { actionCables, isLoggedIn } = this.props;

    if (!isLoggedIn) {
      return null;
    }

    return actionCables.map(({ channel, ...props }) => (
      <ActionCable
        key={`${channel} ${JSON.stringify(props)}`}
        channel={decamelizeKeys({ channel, ...props })}
        onReceived={this.handleReceived}
      />
    ));
  }
}

export default ActionCables;
