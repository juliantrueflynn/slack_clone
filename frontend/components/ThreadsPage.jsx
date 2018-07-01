import React from 'react';
import WorkspacePageContainer from './Workspace/WorkspacePageContainer';
import TopBarHeaderContainer from './TopBarHeaderContainer';
import MessageContainer from './Message/MessageContainer';
import MessageFormContainer from './Message/MessageFormContainer';
import MessageThreadAuthors from './MessageThreadAuthors';

class ThreadsPage extends React.Component {
  componentDidMount() {
    this.props.fetchUserThreadsRequest();
  }

  render() {
    const { match, messages, members } = this.props;

    return (
      <WorkspacePageContainer match={match}>
        <TopBarHeaderContainer sectionTitle="All Threads">
          <small>Thread count here</small>
        </TopBarHeaderContainer>

        <div>
          {Object.values(messages).map(parentMessage => (
            <div key={parentMessage.id}>
              <div className="thread-channel-meta">
                <strong>Channel: {parentMessage.channelId}</strong><br />
                <MessageThreadAuthors
                  messages={messages}
                  members={members}
                  messageThread={parentMessage.thread}
                  currentUserSlug={this.props.currentUserSlug}
                />
              </div>

              <MessageContainer isSingleMessage message={parentMessage} />
              <ul>
                {parentMessage.thread && parentMessage.thread.map(childSlug => (
                  <li key={childSlug}>
                    <MessageContainer message={messages[childSlug]} />
                  </li>
                ))}
              </ul>
              <MessageFormContainer parentMessageId={parentMessage.id} />
            </div>
          ))}
        </div>
      </WorkspacePageContainer>
    );
  }
}

export default ThreadsPage;
