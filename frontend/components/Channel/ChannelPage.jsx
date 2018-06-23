import React from 'react';
import MessageFormContainer from '../Message/MessageFormContainer';
import ChannelFormContainer from './ChannelFormContainer';
import { RouteWithSubRoutes } from '../../util/routeUtil';
import WorkspacePageContainer from '../Workspace/WorkspacePageContainer';
import TopBarHeaderContainer from '../TopBarHeaderContainer';
import MessageContainer from '../Message/MessageContainer';
import './ChannelPage.css';

class ChannelPage extends React.Component {
  componentDidMount() {
    const { workspaceSlug, channelSlug, messageSlug } = this.props;
    this.props.fetchChannelRequest(channelSlug, { workspaceSlug, messageSlug });
  }

  componentDidUpdate(prevProps) {
    const { workspaceSlug, channelSlug, messageSlug } = this.props;

    if (channelSlug !== prevProps.channelSlug) {
      this.props.fetchChannelRequest(channelSlug, { workspaceSlug, messageSlug });
    }
  }

  render() {
    const { routes, messages, ...props } = this.props;

    if (props.isFetching) {
      return (<h2>Loading...</h2>);
    }

    return (
      <WorkspacePageContainer match={props.match}>
        <div className="page page__channel">
          <TopBarHeaderContainer sectionTitle={props.channelSlug} />
          <div className="messages-pane">
            <div className="messages-pane-body">
              {messages && messages.map(message => (
                <MessageContainer message={message} key={message.slug} />
              ))}
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
