import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';
import { camelizeKeys } from 'humps';
import {
  createMessageReceive, updateMessageReceive, deleteMessageReceive
} from '../actions/messageActions';
import { getChannels } from '../reducers/selectors';
import { createChannelReceive } from '../actions/channelActions';

const mapStateToProps = state => ({
  channels: getChannels(state),
});

const mapDispatchToProps = dispatch => ({
  onReceivedCallback: ({event, data}) => {
    const camelizedProps = camelizeKeys(data);

    switch (event) {
      case "CREATE_MESSAGE" :
        return dispatch(createMessageReceive(camelizedProps));
      case "EDIT_MESSAGE" :
        return dispatch(updateMessageReceive(camelizedProps));
      case "DELETE_MESSAGE" :
        return dispatch(deleteMessageReceive(camelizedProps.slug));
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
            channel={{ channel: 'ChatChannel', channel_id: channel.slug }}
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