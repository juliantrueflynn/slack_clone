import React from 'react';
import ChannelFormContainer from './ChannelFormContainer';
import ChannelSidebar from './ChannelSidebar';
import MessageFormContainer from '../Message/MessageFormContainer';
import ChannelMessages from './ChannelMessages';
import { RouteWithSubRoutes } from '../../util/routeUtil';
import './ChannelPage.css';

class ChannelPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { workspaceSlug, channelSlug, messageSlug } = this.props;
    this.props.channelRequest(channelSlug, workspaceSlug, messageSlug);
  }

  componentDidUpdate(prevProps, prevState) {
    const { workspaceSlug, channelSlug, messageSlug } = this.props;
  
    if (channelSlug !== prevProps.channelSlug) {
      this.props.channelRequest(
        channelSlug,
        workspaceSlug,
        messageSlug || null
      );
    }
  }

  render() {
    const { routes, messages, channelSlug } = this.props;

    return (
      <div className="page page__channel">
        <h1>Channel: {channelSlug}</h1>
        
        <div className="page__channel-content">
          <ChannelSidebar />
          
          <div className="messages-pane">
            <ChannelMessages messages={messages} />
            <MessageFormContainer />
          </div>

          {routes && routes.map((route, i) => (
            <RouteWithSubRoutes key={`channelRoute${i}`} {...route} />
          ))}
        </div>
        
        <ChannelFormContainer />
      </div>
    );
  }
}

export default ChannelPage;