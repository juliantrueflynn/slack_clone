import React from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';
import { camelizeKeys, decamelizeKeys } from 'humps';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  onReceivedCallback: ({ type, ...props }) => {
    const camelizedProps = camelizeKeys(props);
    return dispatch({ type, ...camelizedProps });
  },
});

class ActionCableChannel extends React.Component {
  constructor(props) {
    super(props);

    this.handleReceived = this.handleReceived.bind(this);
  }

  handleReceived(received) {
    this.props.onReceivedCallback(received);
  }

  render() {
    const { currentUser, channel, ...cableProps } = this.props;
    const decamelizedChannel = decamelizeKeys(channel);

    if (!currentUser) {
      return null;
    }

    return (
      <ActionCable
        channel={{ ...decamelizedChannel }}
        onReceived={this.handleReceived}
        {...cableProps}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionCableChannel);
