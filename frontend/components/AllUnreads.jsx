import React from 'react';
import AllUnreadsItem from './AllUnreadsItem';
import Scrollable from './Scrollable';

const AllUnreads = ({
  channels,
  messages,
  users,
  clearUnreads,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="AllUnreads AllUnreads--loading">
        Loading!
      </div>
    );
  }

  if (!channels.length) {
    return (
      <div className="AllUnreads AllUnreads--empty">
        You are all caught up!
      </div>
    );
  }

  return (
    <div className="AllUnreads">
      <Scrollable>
        {channels.map(channel => (
          <AllUnreadsItem
            key={channel.id}
            channel={channel}
            authors={users}
            messages={messages}
            clearUnreads={clearUnreads}
          />
        ))}
      </Scrollable>
    </div>
  );
};

export default AllUnreads;
