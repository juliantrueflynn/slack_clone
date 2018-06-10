import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';
import { camelizeKeys } from 'humps';
import { updateMessage, deleteMessage, createMessage } from '../actions/messageActions';
import { getChannels } from '../reducers/selectors';
import { setStatus } from '../actions/memberActions';
import { createWorkspace } from '../actions/workspaceActions';
import { createChannel, updateChannel, deleteChannel } from '../actions/channelActions';
import { createFavorite, deleteFavorite } from '../actions/favoriteActions';
import { createReaction, deleteReaction } from '../actions/reactionActions';

const mapStateToProps = state => ({
  channels: getChannels(state),
  currentUser: state.session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  onReceivedCallback: (received) => {
    const camelized = camelizeKeys(received);

    switch (received.event) {
      case 'CREATE_MESSAGE':
        return dispatch(createMessage.receive(
          camelized.message,
          camelized.parentMessageSlug,
        ));
      case 'EDIT_MESSAGE':
        return dispatch(updateMessage.receive(camelized.message));
      case 'DELETE_MESSAGE':
        return dispatch(deleteMessage.receive(camelized.message.slug));
      case 'CREATE_FAVORITE':
        camelized.favorite.messageSlug = camelized.messageSlug;
        return dispatch(createFavorite.receive(camelized.favorite));
      case 'DELETE_FAVORITE':
        camelized.favorite.messageSlug = camelized.messageSlug;
        return dispatch(deleteFavorite.receive(camelized.favorite));
      case 'CREATE_REACTION':
        return dispatch(createReaction.receive(camelized.reaction));
      case 'DELETE_REACTION':
        return dispatch(deleteReaction.receive(camelized.reaction));
      case 'CREATE_CHANNEL':
        return dispatch(createChannel.receive(camelized.channel));
      case 'EDIT_CHANNEL':
        return dispatch(updateChannel.receive(camelized.channel));
      case 'DELETE_CHANNEL':
        return dispatch(deleteChannel.receive(camelized.channel));
      case 'CREATE_WORKSPACE':
        return dispatch(createWorkspace.receive(camelized.workspace));
      case 'STATUS':
        return dispatch(setStatus(
          camelized.user.slug,
          camelized.user.appearance,
        ));
      default:
        return null;
    }
  },
});

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
      />
    );
  }
}

class SocketWorkspace extends React.Component {
  constructor(props) {
    super(props);

    this.handleReceived = this.handleReceived.bind(this);
    this.handleConnected = this.handleConnected.bind(this);
    this.handleDisconnected = this.handleDisconnected.bind(this);
  }

  handleReceived(received) {
    this.props.onReceivedCallback(received);
  }

  handleConnected() {
    this.refs.workspaceCable.perform('online', {
      workspace_slug: this.props.workspaceSlug,
    });
  }

  handleDisconnected() {
    this.refs.workspaceCable.perform('offline', {
      workspace_slug: this.props.workspaceSlug,
    });
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
        onConnected={this.handleConnected}
        onDisconnected={this.handleDisconnected}
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
