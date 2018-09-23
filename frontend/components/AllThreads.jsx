import React from 'react';
import AllThreadsItem from './AllThreadsItem';
import './AllThreads.css';

const AllThreads = ({
  chatPath,
  messages,
  users,
  channels,
  currentUser,
  match: { params: { workspaceSlug } },
}) => {
  if (chatPath !== 'threads') {
    return null;
  }

  const messagesArr = Object.values(messages);
  const parentMessages = messagesArr.filter(entry => entry.isActiveThread).reverse();

  return (
    <div className="AllThreads">
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
