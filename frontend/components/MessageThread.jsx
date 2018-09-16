import React from 'react';
import MessageFormContainer from './MessageFormContainer';
import RightSidebarContainer from './RightSidebarContainer';
import MessagesPane from './MessagesPane';
import './MessageThread.css';

class MessageThread extends React.Component {
  componentDidMount() {
    const { fetchMessageRequest, messageSlug } = this.props;
    fetchMessageRequest(messageSlug);
  }

  componentDidUpdate(prevProps) {
    const { fetchMessageRequest, messageSlug } = this.props;

    if (messageSlug !== prevProps.messageSlug) {
      fetchMessageRequest(messageSlug);
    }
  }

  render() {
    const {
      message,
      messages,
      channel,
      authors,
    } = this.props;

    if (!message) return null;

    const childMessages = message.thread.reduce((acc, curr) => {
      acc.push(messages[curr]);
      return acc;
    }, [message]);

    const sidebarProps = {
      path: `/thread/${message.slug}`
    };

    return (
      <RightSidebarContainer sidebarType="Thread" sidebarProps={sidebarProps}>
        <div className="MessageThread">
          <MessagesPane
            messages={childMessages}
            users={authors}
            channel={channel}
            isInSidebar
          />
          <MessageFormContainer channelId={message.channelId} parentMessageId={message.id} />
        </div>
      </RightSidebarContainer>
    );
  }
}

export default MessageThread;
