import React from 'react';
import { ActionCableProvider } from 'react-actioncable-provider';
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
    return (
      <ActionCableProvider url="ws://localhost:3000/cable">
        <div className="page page__channel">
          <h1>Channel #{ this.props.match.params.channelSlug }</h1>
          <div className="page__channel-content">
            <ChannelSidebarContainer />
            <MessagesPane />
            <ChannelRightSidebarContainer />
          </div>
          <ChannelFormContainer />
        </div>
      </ActionCableProvider>
    );
  }
}

export default ChannelPage;