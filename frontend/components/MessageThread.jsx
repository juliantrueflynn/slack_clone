import React from 'react';
import MessageFormContainer from './MessageFormContainer';
import RightSidebarContainer from './Layout/RightSidebarContainer';
import MessagesPane from './MessagesPane';
import './MessageThread.css';

class MessageThread extends React.Component {
  componentDidMount() {
    const {
      message,
      messageSlug,
      fetchMessageRequest,
      readUpdateRequest
    } = this.props;

    fetchMessageRequest(messageSlug);
    if (message) readUpdateRequest(message.id);
  }

  componentDidUpdate(prevProps) {
    const {
      message,
      messageSlug,
      fetchMessageRequest,
      readUpdateRequest
    } = this.props;

    if (messageSlug !== prevProps.messageSlug) {
      fetchMessageRequest(messageSlug);
      if (message) readUpdateRequest(message.id);
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

    return (
      <RightSidebarContainer sidebarType="Thread" sidebarSubtitle={chatTitle}>
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
