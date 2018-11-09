import React from 'react';
import EmptyDisplay from './EmptyDisplay';
import ScrollBar from './ScrollBar';
import AllUnreadsItem from './AllUnreadsItem';

const AllUnreads = ({
  channels,
  messages,
  users,
  clearUnreads,
}) => {
  if (!channels.length) {
    return (
      <EmptyDisplay topIcon={['far', 'smile-beam']} topIconHexColor="#FECB6E">
        You&#8217;re all caught up!
      </EmptyDisplay>
    );
  }

  return (
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
  );
};

export default AllUnreads;
