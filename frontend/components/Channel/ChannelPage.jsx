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
    
    if (!match) {
      return false;
    }
    
    channelRequest(
      match.params.channelSlug,
      match.params.workspaceSlug,
      match.params.messageSlug
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.match) {
      return false;
    }
  
    const { messageSlug, channelSlug, workspaceSlug } = this.props.match.params;
    const nextChannelSlug = nextProps.match.params.channelSlug;
    const nextMessageSlug = nextProps.match.params.messageSlug;
  
    if (channelSlug !== nextChannelSlug) {
      this.props.channelRequest(
        nextChannelSlug,
        workspaceSlug,
        nextMessageSlug || null
      );
    }
  }

  render() {
    const { routes, messages, match, location } = this.props;

    return (
      <div>
        <div className="page page__channel">
          <h1>Channel</h1>
          <div className="page__channel-content">
            <ChannelSidebar />
            <div className="messages-pane">
              <ChannelMessages messages={messages} />
              <MessageFormContainer />
            </div>

            {this.props.routes && this.props.routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}

          </div>
          <ChannelFormContainer />
        </div>
      </div>
    );
  }
}

export default ChannelPage;