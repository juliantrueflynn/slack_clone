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
  if (chatPath !== 'threads') {
    return null;
  }

  if (isLoading) {
    return (
      <div className="ChatPage__loading">
        Page loading...
      </div>
    );
  }

  const messagesArr = Object.values(messages);
  const parentMessages = messagesArr.filter(entry => entry.isActiveThread).reverse();

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
