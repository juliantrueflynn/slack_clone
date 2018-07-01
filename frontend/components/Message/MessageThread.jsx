import React from 'react';
import MessageContainer from './MessageContainer';
import MessageFormContainer from './MessageFormContainer';
import RightSidebarContainer from '../Layout/RightSidebarContainer';
import MessagesList from './MessagesList';

class MessageThread extends React.Component {
  componentDidMount() {
    const { openRightSidebar, match: { params } } = this.props;
    const sidebarProps = { messageSlug: params.messageSlug };
    openRightSidebar(sidebarProps);
  }

  componentDidUpdate(prevProps) {
    const { openRightSidebar, match: { params } } = this.props;

    if (params.messageSlug !== prevProps.match.params.messageSlug) {
      const sidebarProps = { messageSlug: params.messageSlug };
      openRightSidebar(sidebarProps);
    }
  }

  render() {
    const { message, threadMessages, ...props } = this.props;

    if (!message) {
      return null;
    }

    return (
      <RightSidebarContainer
        sidebarTitle="Thread"
        sidebarSubtitle={`Author: ${message.authorId}`}
        match={props.match}
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
