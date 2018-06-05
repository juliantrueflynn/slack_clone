import React from 'react';
import ChannelHeaderContainer from './ChannelHeaderContainer';
import ChannelSidebarContainer from './ChannelSidebarContainer';
import ChannelMessages from './ChannelMessages';
import MessageFormContainer from '../Message/MessageFormContainer';
import ChannelFormContainer from './ChannelFormContainer';
import { RouteWithSubRoutes } from '../../util/routeUtil';
import './ChannelPage.css';

class ChannelPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { workspaceSlug, channelSlug, messageSlug } = this.props;
    this.props.channelRequest(channelSlug, { workspaceSlug, messageSlug });
  }

  componentDidUpdate(prevProps, prevState) {
    const { workspaceSlug, channelSlug, messageSlug } = this.props;
  
    if (channelSlug !== prevProps.channelSlug) {
      this.props.channelRequest(
        channelSlug,
        { workspaceSlug, messageSlug: messageSlug || null }
      );
    }
  }

  render() {
    const { routes, messages } = this.props;

    return (
      <div className="page page__channel">
        <ChannelSidebarContainer />
        
        <div className="messages-pane">
          <ChannelHeaderContainer />
          <div className="messages-pane-body">
            <ChannelMessages messages={messages} />
            <MessageFormContainer />
          </div>
        </div>

        {routes && routes.map((route, i) => (
          <RouteWithSubRoutes key={`channelRoute${i}`} {...route} />
        ))}
        
        <ChannelFormContainer />
      </div>
    );
  }
}

export default ChannelPage;