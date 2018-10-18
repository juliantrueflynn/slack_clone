import React from 'react';
import Scrollable from './Scrollable';
import MessageContainer from './MessageContainer';

const FavoritesDrawer = ({ messages, members }) => (
  <Scrollable>
    {messages.map(message => (
      <MessageContainer
        key={message.slug}
        users={members}
        message={message}
        isThreadHidden
      />
    ))}
  </Scrollable>
);

export default FavoritesDrawer;
