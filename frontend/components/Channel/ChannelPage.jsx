import React from 'react';
import ChannelFormContainer from './ChannelFormContainer';
import ChannelSidebar from './ChannelSidebar';
import ChannelRightSidebarContainer from './ChannelRightSidebarContainer';
import MessageFormContainer from '../Message/MessageFormContainer';
import ChannelMessages from './ChannelMessages';
import { RouteWithSubRoutes } from '../../util/routeUtil';
import './ChannelPage.css';

class ChannelPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { channelRequest, match } = this.props;
    
    channelRequest(
      match.params.channelSlug,
      match.params.workspaceSlug,
      match.params.messageSlug
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { channelSlug, messageSlug } = this.props;
  
    if (channelSlug !== prevProps.channelSlug) {
      this.props.channelRequest(
        channelSlug,
        this.props.workspaceSlug,
        messageSlug || null
      );
    }
  }

  render() {
    return (
      <div className="page page__channel">
        <h1>Channel {this.props.channelSlug}</h1>
        <div className="page__channel-content">
          <ChannelSidebar />
          <div className="messages-pane">
            <ChannelMessages messages={this.props.messages} />
            <MessageFormContainer />
          </div>

          {this.props.routes && this.props.routes.map((route, i) => (
            <RouteWithSubRoutes key={`channelRoute${i}`} {...route} />
          ))}

        </div>
        <ChannelFormContainer />
      </div>
    );
  }
}

export default ChannelPage;