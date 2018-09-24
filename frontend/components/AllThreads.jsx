import React from 'react';
import AllThreadsItem from './AllThreadsItem';

const AllThreads = ({
  match: { params: { workspaceSlug } },
  chatPath,
  messages,
  users,
  channels,
  currentUser,
  isLoading,
}) => {
  if (chatPath !== 'threads' || isLoading) {
    return null;
  }

  const messagesArr = Object.values(messages);
  const parentMessages = messagesArr.filter(entry => entry.isActiveThread).reverse();

  if (!parentMessages.length) {
    return (
      <div className="AllThreads AllThreads--empty">
        No threads
      </div>
    );
  }

  return (
    <div role="list" className="AllThreads">
      {parentMessages.map(parent => (
        <AllThreadsItem
          key={parent.slug}
          currentUserSlug={currentUser.slug}
          channels={channels}
          parentMessage={parent}
          users={users}
          messages={messages}
          workspaceSlug={workspaceSlug}
        />
      ))}
    </div>
  );
};

export default AllThreads;
