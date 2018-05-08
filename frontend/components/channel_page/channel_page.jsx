import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import MessagesPane from '../messages_pane/messages_pane';
import ChannelFormContainer from '../channel_form/channel_form_container';
import './channel_page.css';
import ChannelSidebarContainer from
  '../channel_sidebar/channel_sidebar_container';
import ChannelRightSidebarContainer from
  '../channel_right_sidebar/channel_right_sidebar_container';

class ChannelPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleReceivedChannel = this.handleReceivedChannel.bind(this);
    this.handleReceivedMessage = this.handleReceivedMessage.bind(this);
  }

  componentDidMount() {
    const { channelSlug, workspaceSlug } = this.props.match.params;
    this.props.loadChannelPage(channelSlug, workspaceSlug);
  }

  componentWillReceiveProps(nextProps) {
    const { channelSlug, workspaceSlug } = this.props.match.params;
    const nextChannelSlug = nextProps.match.params.channelSlug;
    if (channelSlug !== nextChannelSlug) {
      this.props.loadChannelPage(nextChannelSlug, workspaceSlug);
    }
  }

  handleReceivedChannel(message) {
    this.props.createMessageSuccess(message);
  }

  handleReceivedMessage(cable) {
    switch (cable.type) {
      case "EDIT" :
        this.props.editMessageSuccess(cable.data);
        break;
      case "DELETE" :
        this.props.deleteMessageSuccess(cable.data);
        break;
    }
  }

  render() {
    return (
      <div>
        <ActionCable
          channel={{ channel: 'ChatChannel' }}
          onReceived={ this.handleReceivedChannel }
        />

        {this.props.messages.map(message =>
          <ActionCable
            key={ message.id }
            channel={{ channel: 'MessagesChannel', message_id: message.id }}
            onReceived={ this.handleReceivedMessage }
          />
        )}

        <div className="page page__channel">
          <h1>Channel #{ this.props.match.params.channelSlug }</h1>
          <div className="page__channel-content">
            <ChannelSidebarContainer />
            <MessagesPane />
            <ChannelRightSidebarContainer />
          </div>
          <ChannelFormContainer />
        </div>
      </div>
    );
  }
}

export default ChannelPage;