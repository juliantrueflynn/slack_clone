import React from 'react';
import { Redirect } from 'react-router-dom';
import { PageRoutes } from '../../util/routeUtil';
import MessageFormContainer from '../Message/MessageFormContainer';
import ChannelFormContainer from './ChannelFormContainer';
import TopBarHeaderContainer from '../TopBarHeaderContainer';
import MessageContainer from '../Message/MessageContainer';
import './ChannelPage.css';

class ChannelPage extends React.Component {
  componentDidMount() {
    const { channelId, channelSlug, ...props } = this.props;
    if (props.isWorkspaceLoaded) props.fetchChannelRequest(channelSlug);
    if (channelId) props.readUpdateRequest(channelId);
  }

  componentDidUpdate(prevProps) {
    const { channelSlug, fetchChannelRequest, ...props } = this.props;
    if (channelSlug !== prevProps.channelSlug) {
      fetchChannelRequest(channelSlug);
      if (props.channelId) props.readUpdateRequest(props.channelId);
      if (prevProps.channelSlug) props.leaveChannel(prevProps.channelSlug);
    }
  }

  render() {
    const { match, messages, ...props } = this.props;

    if (match.isExact && props.rightSidebar) {
      const { messageSlug } = props;
      if (messageSlug && props.rightSidebar === 'Thread') {
        return (<Redirect to={`${match.url}/thread/${messageSlug}`} />);
      }

      if (props.rightSidebar === 'Favorites') {
        return (<Redirect to={`${match.url}/favorites`} />);
      }

      if (props.rightSidebar === 'Workspace Directory') {
        return (<Redirect to={`${match.url}/team/${props.userSlug}`} />);
      }
    }

    return (
      <div className="page page__channel">
        <TopBarHeaderContainer
          sectionTitle={props.channelSlug}
          match={match}
          location={props.location}
        />
        <div className="messages-pane">
          <div className="messages-pane-body">
            {messages.map(message => (
              <MessageContainer key={message.slug} message={message} />
            ))}
            <MessageFormContainer />
          </div>
        </div>
        <PageRoutes routes={props.routes} />
        <ChannelFormContainer />
      </div>
    );
  }
}

export default ChannelPage;
