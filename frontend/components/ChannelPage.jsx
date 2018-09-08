import React from 'react';
import { Redirect } from 'react-router-dom';
import MessagesPane from './MessagesPane';
import MessageFormContainer from './MessageFormContainer';
import ChannelSubscribe from './ChannelSubscribe';
import ChatPage from './ChatPage';
import './ChannelPage.css';

class ChannelPage extends React.Component {
  componentDidMount() {
    const {
      channelSlug,
      isWorkspaceLoaded,
      fetchChannelRequest,
      channel,
      updateReadRequest,
      workspaceSlug,
    } = this.props;

    if (isWorkspaceLoaded) fetchChannelRequest(channelSlug);
    if (channel) {
      const read = { readableId: channel.id, readableType: 'Channel', workspaceSlug };
      updateReadRequest(read);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      channelSlug,
      channel,
      fetchChannelRequest,
      updateReadRequest,
      match: { params: { workspaceSlug } },
    } = this.props;

    if (channelSlug !== prevProps.channelSlug) {
      fetchChannelRequest(channelSlug);

      if (channel) {
        const read = { readableId: channel.id, readableType: 'Channel', workspaceSlug };
        updateReadRequest(read);
      }
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
      isRightSidebarOpen,
      userSlug,
      authors,
      messageSlug,
      isChatSub,
      currentUserId,
      createChannelSubRequest,
      isReactionModalOpen,
    } = this.props;

    if (!channel) return null;

    let redirectUrl;

    if (isExact && isRightSidebarOpen) {
      const { sidebarType } = rightSidebar;

      if (sidebarType === 'Thread') {
        redirectUrl = `${url}/thread/${messageSlug}`;
      } else if (sidebarType === 'Favorites') {
        redirectUrl = `${url}/favorites`;
      } else if (sidebarType === 'Workspace Directory') {
        redirectUrl = `${url}/team/${userSlug}`;
      }
    }

    if (!channel.workspaceSlug) {
      const defChatSlug = channels[0].slug;
      redirectUrl = `/${params.workspaceSlug}/${defChatSlug}`;
    }

    if (redirectUrl) return <Redirect to={redirectUrl} />;

    let chatTitle = `#${channel.title}`;
    let placeholder = chatTitle;
    if (channel.hasDm) {
      chatTitle = dmUsernames.join(', ');
      placeholder = dmUsernames.length === 1 ? `@${chatTitle}` : chatTitle;
    }

    const formPlaceholder = placeholder && `Message ${placeholder}`;
    const ownerName = authors[channel.ownerSlug] && authors[channel.ownerSlug].username;

    return (
      <ChatPage chatTitle={chatTitle} isReactionModalOpen={isReactionModalOpen}>
        <MessagesPane
          messages={messages}
          users={authors}
          channel={channel}
        />
        {/* <MessageFormContainer placeholder={formPlaceholder} /> */}
        <ChannelSubscribe
          title={chatTitle}
          ownerName={ownerName}
          channel={channel}
          isChatSub={isChatSub}
          userId={currentUserId}
          createChannelSubRequest={createChannelSubRequest}
        />
      </ChatPage>
    );
  }
}

export default ChannelPage;
