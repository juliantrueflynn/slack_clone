import React from 'react';
import ChannelHeaderContainer from './ChannelHeaderContainer';
import MessageContainer from './MessageContainer';
import MessageFormContainer from './MessageFormContainer';
import MessageThreadAuthors from './MessageThreadAuthors';

class ThreadsPage extends React.Component {
  componentDidMount() {
    const { fetchUserThreadsRequest } = this.props;
    fetchUserThreadsRequest();
  }

  render() {
    const { messages, members, currentUserSlug } = this.props;

    return (
      <div>
        <ChannelHeaderContainer sectionTitle="All Threads">
          <small>
            Thread count here
          </small>
        </ChannelHeaderContainer>

        <div>
          {Object.values(messages).map(parentMessage => (
            <div key={parentMessage.id}>
              <div className="thread-channel-meta">
                <strong>
                  Channel:
                  {parentMessage.channelId}
                </strong>
                <br />
                <MessageThreadAuthors
                  messages={messages}
                  members={members}
                  messageThread={parentMessage.thread}
                  currentUserSlug={currentUserSlug}
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
      </div>
    );
  }
}

export default ThreadsPage;
