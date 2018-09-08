import React from 'react';
import AllUnreadsItem from './AllUnreadsItem';
import ChatPage from './ChatPage';

class AllUnreads extends React.Component {
  componentDidMount() {
    const { isWorkspaceLoaded, fetchUnreadsRequest, workspaceSlug } = this.props;
    if (isWorkspaceLoaded) fetchUnreadsRequest(workspaceSlug);
  }

  render() {
    const {
      unreadChannels,
      messages,
      authors,
      isReactionModalOpen,
    } = this.props;

    if (!unreadChannels) return null;

    return (
      <ChatPage
        chatTitle="All Unreads"
        chatClassName="unreads"
        isReactionModalOpen={isReactionModalOpen}
      >
        {unreadChannels.map(channel => (
          <AllUnreadsItem
            key={channel.id}
            channel={channel}
            authors={authors}
            messages={messages}
          />
        ))}
      </ChatPage>
    );
  }
}

export default AllUnreads;
