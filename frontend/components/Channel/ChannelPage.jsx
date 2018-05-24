import React from 'react';
import ChannelFormContainer from './ChannelFormContainer';
import ChannelSidebar from './ChannelSidebar';
import MessageFormContainer from '../Message/MessageFormContainer';
import ChannelMessages from './ChannelMessages';
import ChannelHeader from './ChannelHeader';
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
    const { routes, messages, workspaceSlug, channelSlug } = this.props;

    return (
      <div className="page page__channel">
        <ChannelSidebar />
        
        <div className="messages-pane">
          <ChannelHeader
            workspaceSlug={workspaceSlug}
            channelSlug={channelSlug}
            openRightSidebar={this.props.openRightSidebar}
            closeRightSidebar={this.props.closeRightSidebar}
            match={this.props.match}
            rightSidebar={this.props.rightSidebar}
            location={this.props.location}            
            navigate={this.props.navigate}
          />
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