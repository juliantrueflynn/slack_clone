import React from 'react';
import { Redirect } from 'react-router-dom';
import { PageRoutes } from '../../util/routeUtil';
import MessageFormContainer from '../Message/MessageFormContainer';
import TopBarHeaderContainer from '../TopBarHeaderContainer';
import MessageContainer from '../Message/MessageContainer';
import './ChannelPage.css';

class ChannelPage extends React.Component {
  componentDidMount() {
    const { channel, channelSlug, ...props } = this.props;
    if (props.isWorkspaceLoaded) props.fetchChannelRequest(channelSlug);
    if (channel) props.readUpdateRequest(channel.id);
  }

  componentDidUpdate(prevProps) {
    const { channelSlug, fetchChannelRequest, ...props } = this.props;
    if (channelSlug !== prevProps.channelSlug) {
      if (prevProps.channelSlug) props.leaveChannel(prevProps.channelSlug);
      fetchChannelRequest(channelSlug);
      if (props.channel) props.readUpdateRequest(props.channel.id);
    }
  }

  render() {
    const { match, messages, ...props } = this.props;

    if (!props.channel) {
      return null;
    }

    if (match.isExact && props.rightSidebar) {
      const { messageSlug } = props;
      let redirectUrl;

      if (props.rightSidebar === 'Thread') {
        redirectUrl = `${match.url}/thread/${messageSlug}`;
      } else if (props.rightSidebar === 'Favorites') {
        redirectUrl = `${match.url}/favorites`;
      } else if (props.rightSidebar === 'Workspace Directory') {
        redirectUrl = `${match.url}/team/${props.userSlug}`;
      } else {
        return null;
      }

      return (<Redirect to={redirectUrl} />);
    }

    const { channel: { title }, authors } = props;

    return (
      <div className="page page__channel">
        <TopBarHeaderContainer sectionTitle={title} />
        <div className="messages-pane">
          <div className="messages-pane-body">
            {messages.map(message => (
              <MessageContainer
                key={message.slug}
                author={authors[message.authorSlug]}
                message={message}
              />
            ))}
            <MessageFormContainer editorPlaceholder={title && `Message #${title}`} />
          </div>
        </div>
        <PageRoutes routes={props.routes} />
      </div>
    );
  }
}

export default ChannelPage;
