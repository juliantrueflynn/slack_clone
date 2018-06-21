import React from 'react';
import ChannelHeaderContainer from './ChannelHeaderContainer';
import ChannelSidebarContainer from './ChannelSidebarContainer';
import ChannelMessages from './ChannelMessages';
import MessageFormContainer from '../Message/MessageFormContainer';
import ChannelFormContainer from './ChannelFormContainer';
import { RouteWithSubRoutes } from '../../util/routeUtil';
import WorkspacePageContainer from '../Workspace/WorkspacePageContainer';
import './ChannelPage.css';

class ChannelPage extends React.Component {
  componentDidMount() {
    const { workspaceSlug, channelSlug, messageSlug } = this.props;
    this.props.fetchChannelRequest(channelSlug, { workspaceSlug, messageSlug });
  }

  componentDidUpdate(prevProps) {
    const { workspaceSlug, channelSlug, messageSlug } = this.props;

    if (channelSlug !== prevProps.channelSlug) {
      this.props.fetchChannelRequest(
        channelSlug,
        { workspaceSlug, messageSlug: messageSlug || null },
      );
    }
  }

  render() {
    const { routes, messages } = this.props;

    if (this.props.isFetching) {
      return (<h2>Loading...</h2>);
    }

    return (
      <WorkspacePageContainer match={this.props.match}>
        <div className="page page__channel">
          <ChannelSidebarContainer />

          <div className="messages-pane">
            <ChannelHeaderContainer />
            <div className="messages-pane-body">
              <ChannelMessages messages={messages} />
              <MessageFormContainer />
            </div>
          </div>

          {routes && routes.map(route => (
            <RouteWithSubRoutes key={route.path} {...route} />
          ))}

          <ChannelFormContainer />
        </div>
      </WorkspacePageContainer>
    );
  }
}

export default ChannelPage;
