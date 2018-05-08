import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import ChannelFormContainer from '../channel_form/channel_form_container';
import './channel_page.css';
import ChannelSidebarContainer from
  '../channel_sidebar/channel_sidebar_container';
import ChannelRightSidebarContainer from
  '../channel_right_sidebar/channel_right_sidebar_container';
import MessageFormContainer from '../message_form/message_form_container';
import ChannelMessages from './channel_messages';

class ChannelPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleReceived = this.handleReceived.bind(this);
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

  handleReceived({ type, message }) {
    this.props.onReceivedCallback(type, message);
  }

  render() {
    const { channelSlug } = this.props.match.params;
    
    return (
      <div>
        <ActionCable
          channel={{ channel: 'ChatChannel', channel_id: channelSlug }}
          onReceived={ this.handleReceived }
        />

        {this.props.messages.map(message =>
          <ActionCable
            key={ message.id }
            channel={{ channel: 'ChatChannel', channel_id: message.channel_id }}
            onReceived={ this.handleReceived }
          />
        )}

        <div className="page page__channel">
          <h1>Channel #{ channelSlug }</h1>
          <div className="page__channel-content">
            <ChannelSidebarContainer />
            <div className="messages-pane">
              <ChannelMessages messages={ this.props.messages } />
              <MessageFormContainer />
            </div>
            <ChannelRightSidebarContainer />
          </div>
          <ChannelFormContainer />
        </div>
      </div>
    );
  }
}

export default ChannelPage;