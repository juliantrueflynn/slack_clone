import React from 'react';
import AllUnreadsItem from './AllUnreadsItem';

const AllUnreads = ({
  chatPath,
  unreadChannels,
  messages,
  authors,
  clearUnreads,
  isLoading,
}) => {
  if (chatPath !== 'unreads' || isLoading) {
    return null;
  }

  if (!unreadChannels.length) {
    return (
      <div className="AllUnreads AllUnreads--empty">
        You are all caught up!
      </div>
    );
  }

  return (
    <div role="list" className="AllUnreads">
      {unreadChannels.map(channel => (
        <AllUnreadsItem
          key={channel.id}
          channel={channel}
          authors={authors}
          messages={messages}
          clearUnreads={clearUnreads}
        />
      ))}
    </div>
  );
};

export default AllUnreads;
