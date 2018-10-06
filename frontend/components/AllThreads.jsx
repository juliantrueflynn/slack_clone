import React from 'react';
import AllThreadsItem from './AllThreadsItem';
import Scrollable from './Scrollable';

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
      <div className="AllThreads AllThreads--empty">
        No threads
      </div>
    );
  }

  return (
    <div className="AllThreads">
      <Scrollable>
        {messages.map(convo => (
          <AllThreadsItem
            key={convo.slug}
            currentUserSlug={currentUser.slug}
            channels={channels}
            parentMessage={convo}
            users={users}
          />
        ))}
      </Scrollable>
    </div>
  );
};

export default AllThreads;
