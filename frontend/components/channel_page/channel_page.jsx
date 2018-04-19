import React from 'react';
import MessagesPaneContainer from '../messages_pane/messages_pane_container';
import ChannelFormContainer from '../channel_form/channel_form_container';
import ChannelSidebarContainer from
  '../channel_sidebar/channel_sidebar_container';

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
    const { channelSlug, workspaceSlug } = this.props.match.params;

    return (
      <div class="page page__channel">
        <h1>Channel Page Working! #{ channelSlug }</h1>
        <div class="page__channel-content">
          <ChannelSidebarContainer />
          <MessagesPaneContainer />
        </div>
        <ChannelFormContainer />
      </div>
    );
  }
}

export default ChannelPage;