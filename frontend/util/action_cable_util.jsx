import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';
import {
  createMessageSuccess, editMessageSuccess, deleteMessageSuccess
} from '../actions/message_actions';
import { camelizeKeys } from 'humps';
import { getChannels, getChannelPageId } from '../reducers/selectors';
import { createChannelSuccess } from '../actions/channel_actions';

const mapStateToProps = state => ({
  channels: getChannels(state),
  channelId: getChannelPageId(state),
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
        return dispatch(deleteMessageSuccess(camelizedProps.id));
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
    const { channelId, channels } = this.props;
    
    return (
      <Fragment>
        {channels.map(channel =>
          <ActionCable
            key={ channel.id }
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