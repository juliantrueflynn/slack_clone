import React from 'react';
import { Redirect } from 'react-router-dom';
import { PageRoutes } from '../util/routeUtil';
import ChannelHeaderContainer from './ChannelHeaderContainer';
import EmojiModalContainer from './EmojiModalContainer';
import MessagesPane from './MessagesPane';
import MessageFormContainer from './MessageFormContainer';
import ChannelSubscribe from './ChannelSubscribe';
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
      userSlug,
      authors,
      routes,
      messageSlug,
      isChatSub,
      currentUserId,
      createChannelSubRequest,
      isReactionModalOpen,
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

    let chatClassNames = 'ChannelPage';
    if (isReactionModalOpen) chatClassNames += ' ChannelPage--reaction';
    if (!isExact && rightSidebar) chatClassNames += ' ChannelPage--sidebar-open';

    let chatTitle = `#${channel.title}`;
    let placeholder = chatTitle;
    if (channel.hasDm) {
      chatTitle = dmUsernames.join(', ');
      placeholder = dmUsernames.length === 1 ? `@${chatTitle}` : chatTitle;
    }
    const formPlaceholder = placeholder && `Message ${placeholder}`;
    const ownerName = authors[channel.ownerSlug] && authors[channel.ownerSlug].username;

    return (
      <div className={chatClassNames}>
        <ChannelHeaderContainer sectionTitle={chatTitle} />
        <div className="ChannelPage__body">
          <div className="ChannelPage__container">
            <EmojiModalContainer />
            <MessagesPane
              messages={messages}
              users={authors}
              channel={channel}
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
