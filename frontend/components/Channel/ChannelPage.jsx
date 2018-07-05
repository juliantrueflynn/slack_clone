import React from 'react';
import MessageFormContainer from '../Message/MessageFormContainer';
import ChannelFormContainer from './ChannelFormContainer';
import { RouteWithSubRoutes } from '../../util/routeUtil';
import TopBarHeaderContainer from '../TopBarHeaderContainer';
import './ChannelPage.css';
import MessagesList from '../Message/MessagesList';

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
      <div className="page page__channel">
        <TopBarHeaderContainer sectionTitle={props.channelSlug} />
        <div className="messages-pane">
          <div className="messages-pane-body">
            <MessagesList messages={messages} />
            <MessageFormContainer />
          </div>
        </div>

        {routes && routes.map(route => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}

        <ChannelFormContainer />
      </div>
    );
  }
}

export default ChannelPage;
