import React from 'react';
import MessageContainer from './MessageContainer';
import MessageFormContainer from './MessageFormContainer';
import MessagesList from './MessagesList';
import RightSidebarContainer from '../Layout/RightSidebarContainer';

class MessageThread extends React.Component {
  componentDidMount() {
    const { message, isChannelLoaded, ...props } = this.props;

    if (isChannelLoaded) {
      props.fetchMessageRequest(props.messageSlug);
      if (message) props.readUpdateRequest(message.id);
    }
  }

  componentDidUpdate(prevProps) {
    const { message, messageSlug, ...props } = this.props;

    if (prevProps.messageSlug && messageSlug !== prevProps.messageSlug) {
      props.fetchMessageRequest(messageSlug);
      if (message) props.readUpdateRequest(message.id);
    }
  }

  render() {
    const { message, threadMessages } = this.props;

    if (!message) {
      return null;
    }

    return (
      <RightSidebarContainer
        sidebarType="Thread"
        sidebarSubtitle={`Author: ${message.authorId}`}
      >
        <div className="thread">
          <div className="thread__message">
            <MessageContainer isSingleMessage message={message} />
          </div>
          <MessagesList messages={threadMessages} />
          <MessageFormContainer parentMessageId={message.id} />
        </div>
      </RightSidebarContainer>
    );
  }
}

export default MessageThread;
