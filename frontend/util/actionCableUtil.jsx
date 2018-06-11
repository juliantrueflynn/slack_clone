import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';
import { camelizeKeys } from 'humps';
import { getChannels } from '../reducers/selectors';

const mapStateToProps = state => ({
  channels: getChannels(state),
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  onReceivedCallback: ({ type, ...props }) => {
    const camelizedProps = camelizeKeys(props);
    return dispatch({ type, ...camelizedProps });
  },
});

// class SocketApp extends React.Component {
//   constructor(props) {
//     super(props);

//     this.handleReceived = this.handleReceived.bind(this);
//   }

//   handleReceived(received) {
//     this.props.onReceivedCallback(received);
//   }

//   render() {
//     const { channel, ...otherProps } = this.props;

//     return (
//       <ActionCable
//         channel={this.props.channel}
//         onReceived={this.handleReceived}
//         onConnected={this.props.onConnected}
//         {...otherProps}
//       />
//     );
//   }
// }

class SocketApp extends React.Component {
  constructor(props) {
    super(props);

    this.handleReceived = this.handleReceived.bind(this);
  }

  handleReceived(received) {
    this.props.onReceivedCallback(received);
  }

  render() {
    if (!this.props.currentUser) {
      return null;
    }

    return (
      <ActionCable
        channel={{ channel: 'AppChannel' }}
        onReceived={this.handleReceived}
        {...this.props.ownProps}
      />
    );
  }
}

class SocketWorkspace extends React.Component {
  constructor(props) {
    super(props);

    this.handleReceived = this.handleReceived.bind(this);
  }

  handleReceived(received) {
    this.props.onReceivedCallback(received);
  }

  render() {
    return (
      <ActionCable
        ref="workspaceCable"
        channel={{
          channel: 'WorkspaceChannel',
          workspace_slug: this.props.workspaceSlug,
        }}
        onReceived={this.handleReceived}
      />
    );
  }
}

class SocketChatChannel extends React.Component {
  constructor(props) {
    super(props);

    this.handleReceived = this.handleReceived.bind(this);
  }

  handleReceived(received) {
    this.props.onReceivedCallback(received);
  }

  render() {
    return (
      <Fragment>
        {this.props.channels.map(channel => (
          <ActionCable
            key={channel.slug}
            channel={{ channel: 'ChatChannel', channel_id: channel.id }}
            onReceived={this.handleReceived}
          />
        ))}
      </Fragment>
    );
  }
}

export const AppActionCable = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SocketApp);

export const WorkspaceActionCable = connect(
  null,
  mapDispatchToProps,
)(SocketWorkspace);

export const ChannelActionCables = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SocketChatChannel);
