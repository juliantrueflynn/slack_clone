import React from 'react';
import AllUnreadsItem from './AllUnreadsItem';
import Scrollable from './Scrollable';

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
      <Scrollable>
        {unreadChannels.map(channel => (
          <AllUnreadsItem
            key={channel.id}
            channel={channel}
            authors={authors}
            messages={messages}
            clearUnreads={clearUnreads}
          />
        ))}
      </Scrollable>
    </div>
  );
};

export default AllUnreads;
