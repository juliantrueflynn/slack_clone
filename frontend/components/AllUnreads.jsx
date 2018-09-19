import React from 'react';
import AllUnreadsItem from './AllUnreadsItem';

const AllUnreads = ({
  chatPath,
  unreadChannels,
  messages,
  authors,
  clearUnreads,
}) => {
  if (chatPath !== 'unreads') {
    return null;
  }

  return (
    unreadChannels.map(channel => (
      <AllUnreadsItem
        key={channel.id}
        channel={channel}
        authors={authors}
        messages={messages}
        clearUnreads={clearUnreads}
      />
    ))
  );
};

export default AllUnreads;
