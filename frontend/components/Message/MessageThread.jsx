import React from 'react';
import MessageContainer from './MessageContainer';
import MessageFormContainer from './MessageFormContainer';
import RightSidebarContainer from '../Layout/RightSidebarContainer';

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
    const { message, threadMessages } = this.props;

    if (!message) {
      return null;
    }

    return (
      <RightSidebarContainer
        sidebarTitle="Thread"
        sidebarSubtitle={`Author: ${message.authorId}`}
        match={this.props.match}
      >
        <div className="thread">
          <div className="thread__message">
            <MessageContainer isSingleMessage message={message} />
          </div>

          <div className="thread-entries">
            {threadMessages && threadMessages.length && threadMessages.map(entry => (
              <MessageContainer message={entry} key={entry.slug} />
            ))}
          </div>

          <MessageFormContainer parentMessageId={message.id} />
        </div>
      </RightSidebarContainer>
    );
  }
}

export default MessageThread;
