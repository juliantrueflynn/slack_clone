import React from 'react';
import MessageContainer from '../MessageContainer';
import MessageFormContainer from '../MessageFormContainer';
import RightSidebarContainer from '../Layout/RightSidebarContainer';
import './MessageThread.css';

class MessageThread extends React.Component {
  componentDidMount() {
    const { message, ...props } = this.props;

    if (props.isWorkspaceLoaded) {
      props.fetchMessageRequest(props.messageSlug);
      if (message) props.readUpdateRequest(message.id);
    }
  }

  componentDidUpdate(prevProps) {
    const { message, messageSlug, ...props } = this.props;

    if (messageSlug !== prevProps.messageSlug) {
      props.fetchMessageRequest(messageSlug);
      if (message) props.readUpdateRequest(message.id);
    }
  }

  render() {
    const {
      message,
      threadMessages,
      chat,
      authors,
      isWorkspaceLoaded,
    } = this.props;
    const chatTitle = chat && `#${chat.title}`;

    if (!message || !isWorkspaceLoaded) return null;

    return (
      <RightSidebarContainer sidebarType="Thread" sidebarSubtitle={chatTitle}>
        <div className="MessageThread">
          <div className="MessageThread__primary">
            <MessageContainer
              author={authors[message.authorSlug]}
              isSingleMessage
              message={message}
            />
          </div>
          {threadMessages && (
            <div className="MessageThread__secondary">
              {threadMessages.map(threadMessage => (
                <MessageContainer
                  key={threadMessage.slug}
                  message={threadMessage}
                  author={authors[threadMessage.authorSlug]}
                />
              ))}
            </div>
          )}
          <MessageFormContainer parentMessageId={message.id} />
        </div>
      </RightSidebarContainer>
    );
  }
}

export default MessageThread;
