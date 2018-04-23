import React from 'react';
import MessagesPaneContainer from '../messages_pane/messages_pane_container';
import ChannelFormContainer from '../channel_form/channel_form_container';
import ChannelSidebarContainer from
  '../channel_sidebar/channel_sidebar_container';
import './channel_page.css';
import ChannelRightSidebar from './channel_right_sidebar';

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
    const { match, isRightSidebarOpen, closeThread, thread } = this.props;

    return (
      <div className="page page__channel">
        <h1>Channel Page Working! #{ match.params.channelSlug }</h1>
        <div className="page__channel-content">
          <ChannelSidebarContainer />
          <MessagesPaneContainer />
          <ChannelRightSidebar
            closeThread={ closeThread }
            isRightSidebarOpen={ isRightSidebarOpen }
            thread={ thread }
          />
        </div>
        <ChannelFormContainer />
      </div>
    );
  }
}

export default ChannelPage;