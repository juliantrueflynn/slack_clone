import React, { Fragment } from 'react';
import MessagesPane from './MessagesPane';
import MessageFormContainer from './MessageFormContainer';
import ChannelSubscribe from './ChannelSubscribe';

class ChatPage extends React.Component {
  componentDidMount() {
    this.updateRead();
  }

  componentDidUpdate(prevProps) {
    const { location: { pathname } } = this.props;

    if (pathname !== prevProps.location.pathname) {
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
      channel,
      rightSidebar,
      authors,
      isChatSub,
      currentUser,
      createChannelSubRequest,
      chatTitle,
    } = this.props;

    if (!channel) {
      return null;
    }

    const placeholder = channel.hasDm ? `@${chatTitle}` : chatTitle;
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
        <MessageFormContainer placeholder={formPlaceholder} />
        <ChannelSubscribe
          title={chatTitle}
          ownerName={ownerName}
          channel={channel}
          isChatSub={isChatSub}
          userId={currentUser.id}
          createChannelSubRequest={createChannelSubRequest}
        />
      </Fragment>
    );
  }
}

export default ChatPage;
