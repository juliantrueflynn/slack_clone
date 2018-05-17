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
    const { messageSlug, channelSlug, workspaceSlug } = this.props.match.params;
    this.props.channelRequest(channelSlug, workspaceSlug);
  }

  componentWillReceiveProps(nextProps) {
    const { messageSlug, channelSlug, workspaceSlug } = this.props.match.params;
    const nextChannelSlug = nextProps.match.params.channelSlug;
    if (channelSlug !== nextChannelSlug) {
      this.props.channelRequest(nextChannelSlug, workspaceSlug);
    }
  }

  render() {
    const { routes, messages, match, location } = this.props;

    return (
      <div>
        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}

        <div className="page page__channel">
          <h1>Channel #{match.params.channelSlug}</h1>
          <div className="page__channel-content">
            <ChannelSidebar />
            <div className="messages-pane">
              <ChannelMessages messages={messages} />
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