import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';
import { camelizeKeys } from 'humps';
import {
  createMessageReceive, updateMessageReceive, deleteMessageReceive
} from '../actions/messageActions';
import { getChannels } from '../reducers/selectors';

const mapStateToProps = state => ({
  channels: getChannels(state),
});

const mapDispatchToProps = dispatch => ({
  onReceivedCallback: (received) => {
    const camelized = camelizeKeys(received);
  
    switch (received.event) {
      case "CREATE_MESSAGE" :
        camelized.message.channelSlug = camelized.channelSlug;
        
        return dispatch(createMessageReceive(
          camelized.message,
          camelized.parentMessageSlug
        ));
      case "EDIT_MESSAGE" :
        return dispatch(updateMessageReceive(camelized.message));
      case "DELETE_MESSAGE" :
        return dispatch(deleteMessageReceive(camelized.slug));
    }
  }
});

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