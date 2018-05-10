import React from 'react';
import ChannelFormContainer from '../channel_form/channel_form_container';
import ChannelSidebarContainer from
  '../channel_sidebar/channel_sidebar_container';
import ChannelRightSidebarContainer from
  '../channel_right_sidebar/channel_right_sidebar_container';
import MessageFormContainer from '../message_form/message_form_container';
import ChannelMessages from './channel_messages';

import './channel_page.css';

class ChannelPage extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    const { messages, match: { params } } = this.props;
    
    return (
      <div>
        <div className="page page__channel">
          <h1>Channel #{ params.channelSlug }</h1>
          <div className="page__channel-content">
            <ChannelSidebarContainer />
            <div className="messages-pane">
              <ChannelMessages messages={ messages } />
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