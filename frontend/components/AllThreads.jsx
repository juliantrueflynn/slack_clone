import React, { Fragment } from 'react';
import MessageContainer from './MessageContainer';
import MessageFormContainer from './MessageFormContainer';
import MessageThreadAuthors from './MessageThreadAuthors';

class AllThreads extends React.Component {
  componentDidMount() {
    const { fetchUserThreadsRequest, isWorkspaceLoaded } = this.props;

    if (isWorkspaceLoaded) {
      fetchUserThreadsRequest();
    }
  }

  render() {
    const {
      messages,
      members,
      currentUserSlug,
      isWorkspaceLoaded,
    } = this.props;

    if (!isWorkspaceLoaded) return null;

    return (
      <Fragment>
        {Object.values(messages).map(parent => (
          <div key={parent.slug}>
            <div className="AllThreads__meta">
              <strong>
                {parent.channelId}
              </strong>
              <MessageThreadAuthors
                messages={messages}
                members={members}
                messageThread={parent.thread}
                currentUserSlug={currentUserSlug}
              />
            </div>
            <MessageContainer message={parent} />
            <div className="ThreadsList" role="list">
              {parent.thread && parent.thread.map(childSlug => (
                <MessageContainer key={childSlug} message={messages[childSlug]} />
              ))}
            </div>
            <MessageFormContainer parentMessageId={parent.id} />
          </div>
        ))}
      </Fragment>
    );
  }
}

export default AllThreads;
