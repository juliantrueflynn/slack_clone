import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCable } from 'react-actioncable-provider';
import {
  createMessageSuccess, editMessageSuccess, deleteMessageSuccess
} from '../actions/message_actions';
import { camelizeKeys } from 'humps';
import { getChannels, getChannelPageId } from '../reducers/selectors';

const mapStateToProps = state => ({
  channels: getChannels(state),
  channelId: getChannelPageId(state),
});

const mapDispatchToProps = dispatch => ({
  onReceivedCallback: (type, message) => {
    const camelized = camelizeKeys(message);

    switch (type) {
      case "CREATE" :
        return dispatch(createMessageSuccess(camelized));
      case "EDIT" :
        return dispatch(editMessageSuccess(camelized));
      case "DELETE" :
        return dispatch(deleteMessageSuccess(camelized.id));
    }
  }
});

class SocketChatChannel extends React.Component {
  constructor(props) {
    super(props);

    this.handleReceived = this.handleReceived.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { channelId, channels } = this.props;
    
    if (
      channelId !== nextProps.channelId ||
      channels.length !== nextProps.length
    ) {
      return true;
    }
  }

  handleReceived({ type, message }) {
    this.props.onReceivedCallback(type, message);
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