import React from 'react';
import ScrollBar from './ScrollBar';
import AllThreadsItem from './AllThreadsItem';

const AllThreads = ({
  messages,
  users,
  channels,
  currentUser,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="ChatPage__loader">
        Loading
      </div>
    );
  }

  if (!messages.length) {
    return (
      <div className="ChatPage__empty">
        No threads
      </div>
    );
  }

  return (
    <ScrollBar>
      {messages.map(convo => (
        <AllThreadsItem
          key={convo.slug}
          currentUserSlug={currentUser.slug}
          channels={channels}
          parentMessage={convo}
          users={users}
        />
      ))}
    </ScrollBar>
  );
};

export default AllThreads;
