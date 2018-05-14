import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';
import { camelizeKeys } from 'humps';
import {
  createMessageSuccess, editMessageSuccess, deleteMessageSuccess
} from '../actions/message_actions';
import { getChannels } from '../reducers/selectors';
import { createChannelReceive } from '../actions/channel_actions';

const mapStateToProps = state => ({
  channels: getChannels(state),
});

const mapDispatchToProps = dispatch => ({
  onReceivedCallback: ({event, data}) => {
    const camelizedProps = camelizeKeys(data);

    switch (event) {
      case "CREATE_MESSAGE" :
        return dispatch(createMessageSuccess(camelizedProps));
      case "EDIT_MESSAGE" :
        return dispatch(editMessageSuccess(camelizedProps));
      case "DELETE_MESSAGE" :
        return dispatch(deleteMessageSuccess(camelizedProps.slug));
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
            channel={{ channel: 'ChatChannel', channel_slug: channel.slug }}
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