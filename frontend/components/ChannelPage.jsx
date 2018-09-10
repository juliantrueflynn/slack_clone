import React, { Fragment } from 'react';
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
    } = this.props;

    if (isWorkspaceLoaded) {
      fetchChannelRequest(channelSlug);
    }

    this.updateRead();
  }

  componentDidUpdate(prevProps) {
    const {
      channelSlug,
      fetchChannelRequest,
    } = this.props;

    if (channelSlug !== prevProps.channelSlug) {
      fetchChannelRequest(channelSlug);
      this.updateRead();
    }
  }

  updateRead() {
    const {
      channel,
      updateReadRequest,
      match: { params: { workspaceSlug } },
    } = this.props;

    if (channel) {
      const read = { readableId: channel.id, readableType: 'Channel', workspaceSlug };
      updateReadRequest(read);
    }
  }

  render() {
    const {
      messages,
      dmUsernames,
      channel,
      rightSidebar,
      authors,
      isChatSub,
      currentUserId,
      createChannelSubRequest,
    } = this.props;

    if (!channel) return null;

    let chatTitle = `#${channel.title}`;
    let placeholder = chatTitle;
    if (channel.hasDm) {
      chatTitle = dmUsernames.join(', ');
      placeholder = dmUsernames.length === 1 ? `@${chatTitle}` : chatTitle;
    }

    const formPlaceholder = placeholder && `Message ${placeholder}`;
    const ownerName = authors[channel.ownerSlug] && authors[channel.ownerSlug].username;

    return (
      <Fragment>
        <MessagesPane
          messages={messages}
          users={authors}
          channel={channel}
          rightSidebar={rightSidebar}
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
      </Fragment>
    );
  }
}

export default ChannelPage;
