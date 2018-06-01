import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';
import { camelizeKeys } from 'humps';
import {
  createMessageReceive, updateMessageReceive, deleteMessageReceive
} from '../actions/messageActions';
import { getChannels } from '../reducers/selectors';
import { setAppearance } from '../actions/memberActions';

const mapStateToProps = state => ({
  channels: getChannels(state),
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  onReceivedCallback: received => {
    const camelized = camelizeKeys(received);
  
    switch (received.event) {
      case 'CREATE_MESSAGE' :
        return dispatch(createMessageReceive(
          camelized.message,
          camelized.parentMessageSlug
        ));
      case 'EDIT_MESSAGE' :
        return dispatch(updateMessageReceive(camelized.message));
      case 'DELETE_MESSAGE' :
        return dispatch(deleteMessageReceive(camelized.message.slug));
    }
  },
  onConnected: (userId, appearance) => dispatch(
    setAppearance(userId, appearance)
  )
});

class SocketUser extends React.Component {
  constructor(props) {
    super(props);

    this.handleConnected = this.handleConnected.bind(this);
  }

  handleConnected() {
    const { currentUser, onConnected } = this.props;

    if (currentUser) {
      onConnected(currentUser.slug, 'ONLINE');
    }
  }

  render() {
    return (
      <ActionCable
        channel={{ channel: 'UserAppearanceChannel' }}
        onConnected={ this.handleConnected }
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
        {this.props.channels.map(channel =>
          <ActionCable
            key={ channel.slug }
            channel={{ channel: 'ChatChannel', channel_id: channel.id }}
            onReceived={ this.handleReceived }
          />
        )}
      </Fragment>
    );
  }
}

export const ChannelsActionCables = connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketChatChannel);

export const UserActionCable = connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketUser);