import React from 'react';
import MessageContainer from './MessageContainer';
import MessageFormContainer from './MessageFormContainer';
import RightSidebarContainer from '../Layout/RightSidebarContainer';

class MessageThread extends React.Component {
  constructor(props) {
    super(props);
  }

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
    const { message, threadEntries } = this.props;
  
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
            <div>
              ID: {message.id}<br/>
              Slug: {message.slug}<br/>
              Author: {message.authorId}<br/>
              Body: {message.body}<br/>
            </div>
          </div>
  
          <div className="thread-entries">
            {threadEntries && threadEntries.map(entry => (
              <MessageContainer message={entry} key={entry.slug} />
            ))}
          </div>
  
          <MessageFormContainer parentMessageId={message.slug} />
        </div>
      </RightSidebarContainer>
    );
  }
}

export default MessageThread;