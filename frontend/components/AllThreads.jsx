import React from 'react';
import AllThreadsItem from './AllThreadsItem';
import Scrollable from './Scrollable';

const AllThreads = ({
  chatPath,
  convos,
  users,
  channels,
  currentUser,
  isLoading,
}) => {
  if (chatPath !== 'threads') {
    return null;
  }

  if (isLoading) {
    return (
      <div className="ChatPage__loader">
        Loading
      </div>
    );
  }

  if (!convos.length) {
    return (
      <div className="AllThreads AllThreads--empty">
        No threads
      </div>
    );
  }

  return (
    <div role="list" className="AllThreads">
      <Scrollable>
        {convos.map(convo => (
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
