import React from 'react';
import MessageFormContainer from './MessageFormContainer';
import RightSidebarContainer from './RightSidebarContainer';
import MessagesPane from './MessagesPane';
import './MessageThread.css';

class MessageThread extends React.Component {
  componentDidMount() {
    const {
      message,
      fetchMessageRequest,
      updateReadRequest,
      match: { params: { messageSlug, workspaceSlug } },
    } = this.props;

    fetchMessageRequest(messageSlug);

    if (message) {
      const read = { readableId: message.id, readableType: 'Message', workspaceSlug };
      updateReadRequest(read);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      message,
      fetchMessageRequest,
      updateReadRequest,
      match: { params: { messageSlug, workspaceSlug } },
    } = this.props;

    if (messageSlug !== prevProps.match.params.messageSlug) {
      fetchMessageRequest(messageSlug);

      if (message) {
        const read = { readableId: message.id, readableType: 'Message', workspaceSlug };
        updateReadRequest(read);
      }
    }
  }

  render() {
    const {
      message,
      threadMessages,
      channel,
      authors,
    } = this.props;
    const chatTitle = channel && `#${channel.title}`;

    if (!message) return null;

    const sidebarProps = {
      path: `/thread/${message.slug}`,
      subtitle: chatTitle,
    };

    return (
      <RightSidebarContainer sidebarType="Thread" sidebarProps={sidebarProps}>
        <div className="MessageThread">
          <MessagesPane
            messages={threadMessages}
            users={authors}
            channel={channel}
            isInSidebar
          />
          <MessageFormContainer parentMessageId={message.id} />
        </div>
      </RightSidebarContainer>
    );
  }
}

export default MessageThread;
