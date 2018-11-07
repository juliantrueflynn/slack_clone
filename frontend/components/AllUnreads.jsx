import React from 'react';
import ScrollBar from './ScrollBar';
import AllUnreadsItem from './AllUnreadsItem';

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
      <div className="ChatPageSwitch__empty">
        You are all caught up!
      </div>
    );
  }

  return (
    <div className="AllUnreads">
      <ScrollBar>
        {channels.map(channel => (
          <AllUnreadsItem
            key={channel.id}
            channel={channel}
            authors={users}
            messages={messages}
            clearUnreads={clearUnreads}
          />
        ))}
      </ScrollBar>
    </div>
  );
};

export default AllUnreads;
