import React from 'react';
import EmptyDisplay from './EmptyDisplay';
import ScrollBar from './ScrollBar';
import AllThreadsItem from './AllThreadsItem';

const AllThreads = ({
  messages,
  users,
  channels,
  currentUser,
  isLoading,
  workspaceSlug,
}) => {
  if (isLoading) {
    return (
      <EmptyDisplay hasLoadingIcon />
    );
  }

  if (!messages.length) {
    return (
      <EmptyDisplay topIcon={['far', 'comments']} topIconHexColor="#B2BEC3">
        No conversations started
      </EmptyDisplay>
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
          workspaceSlug={workspaceSlug}
        />
      ))}
    </ScrollBar>
  );
};

export default AllThreads;
