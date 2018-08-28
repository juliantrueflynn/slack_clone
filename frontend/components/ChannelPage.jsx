import React from 'react';
import { Redirect } from 'react-router-dom';
import { PageRoutes } from '../util/routeUtil';
import ChannelHeaderContainer from './ChannelHeaderContainer';
import MessagesPane from './MessagesPane';
import MessageFormContainer from './Message/MessageFormContainer';
import ChannelSubscribe from './ChannelSubscribe';
import './ChannelPage.css';

class ChannelPage extends React.Component {
  componentDidMount() {
    const {
      channel,
      channelSlug,
      isWorkspaceLoaded,
      fetchChannelRequest,
      readUpdateRequest,
    } = this.props;

    if (isWorkspaceLoaded) fetchChannelRequest(channelSlug);
    if (channel) readUpdateRequest(channel.id);
  }

  componentDidUpdate(prevProps) {
    const { channelSlug, fetchChannelRequest, ...props } = this.props;
    if (channelSlug !== prevProps.channelSlug) {
      fetchChannelRequest(channelSlug);
      if (props.channel) props.readUpdateRequest(props.channel.id);
    }
  }

  render() {
    const {
      match: { isExact, url, params },
      channels,
      messages,
      dmUsernames,
      channel,
      rightSidebar,
      userSlug,
      authors,
      routes,
      messageSlug,
      isChatSub,
      currentUserId,
      createChannelSubRequest,
    } = this.props;

    if (!channel) return null;

    if (!channel.workspaceSlug) {
      const defaultChatSlug = channels[0].slug;

      return (
        <Redirect to={`/${params.workspaceSlug}/${defaultChatSlug}`} />
      );
    }

    if (isExact && rightSidebar) {
      let redirectUrl;

      if (rightSidebar === 'Thread') {
        redirectUrl = `${url}/thread/${messageSlug}`;
      } else if (rightSidebar === 'Favorites') {
        redirectUrl = `${url}/favorites`;
      } else if (rightSidebar === 'Workspace Directory') {
        redirectUrl = `${url}/team/${userSlug}`;
      } else {
        return null;
      }

      return (<Redirect to={redirectUrl} />);
    }

    let chatTitle = `#${channel.title}`;
    let placeholder = chatTitle;
    if (channel.hasDm) {
      chatTitle = dmUsernames.join(', ');
      placeholder = dmUsernames.length === 1 ? `@${chatTitle}` : chatTitle;
    }
    const formPlaceholder = placeholder && `Message ${placeholder}`;
    const ownerName = authors[channel.ownerSlug] && authors[channel.ownerSlug].username;

    return (
      <div className="Channel">
        <ChannelHeaderContainer sectionTitle={chatTitle} />
        <div className="Channel__body">
          <div className="Channel__container">
            <MessagesPane
              chatTitle={chatTitle}
              messages={messages}
              channel={channel}
              users={authors}
            />
            <MessageFormContainer placeholder={formPlaceholder} />
            <ChannelSubscribe
              title={chatTitle}
              ownerName={ownerName}
              channel={channel}
              isChatSub={isChatSub}
              userId={currentUserId}
              createChannelSubRequest={createChannelSubRequest}
            />
          </div>
          <PageRoutes routes={routes} />
        </div>
      </div>
    );
  }
}

export default ChannelPage;
