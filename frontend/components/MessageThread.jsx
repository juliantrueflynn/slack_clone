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
      match: { params: { messageSlug } },
    } = this.props;

    fetchMessageRequest(messageSlug);

    if (message) {
      const read = { readableId: message.id, readableType: 'Message' };
      updateReadRequest(read);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      message,
      fetchMessageRequest,
      updateReadRequest,
      match: { params: { messageSlug } },
    } = this.props;

    if (messageSlug !== prevProps.match.params.messageSlug) {
      fetchMessageRequest(messageSlug);

      if (message) {
        const read = { readableId: message.id, readableType: 'Message' };
        updateReadRequest(read);
      }
    }
  }

  readRequest() {
    const { channel, updateReadRequest } = this.props;

    if (channel) {
      const read = { readableId: channel.id, readableType: 'Channel' };
      updateReadRequest(read);
    }
  }

  render() {
    const {
      message,
      threadMessages,
      channel,
      authors,
    } = this.props;

    if (!message) return null;

    const sidebarProps = {
      path: `/thread/${message.slug}`
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
