import React from 'react';
import AllUnreadsItem from './AllUnreadsItem';

const AllUnreads = ({
  chatPath,
  channels,
  messages,
  authors,
}) => {
  if (chatPath !== 'unreads') {
    return null;
  }

  const unreadChannels = channels.filter(ch => ch.hasUnreads);

  return (
    unreadChannels.map(channel => (
      <AllUnreadsItem
        key={channel.id}
        channel={channel}
        authors={authors}
        messages={messages}
      />
    ))
  );
};

export default AllUnreads;
